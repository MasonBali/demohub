import { ModelFusionTextStream, asChatMessages } from "@modelfusion/vercel-ai";
import { Message } from "ai";
import { llamacpp, streamText } from "modelfusion";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    const model = llamacpp
      .CompletionTextGenerator({
        promptTemplate: llamacpp.prompt.ChatML,
        temperature: 0,
        cachePrompt: true,
        maxGenerationTokens: 1024, // Room for answer
        logitBias: [], // Ensure logit_bias is defined correctly
      })
      .withChatPrompt();

    // Use ModelFusion to call llama.cpp:
    const textStream = await streamText({
      model,
      prompt: {
        system:
          "You are an AI chat bot. " +
          "Follow the user's instructions carefully.",
        // map Vercel AI SDK Message to ModelFusion ChatMessage:
        messages: asChatMessages(messages),
      },
    });

    console.log("messages", messages);
    console.log("textStream", textStream);

    // Return the result using the Vercel AI SDK:
    return new Response(
      ModelFusionTextStream(
        textStream,
        // optional callbacks:
        {
          onStart() {
            console.log("onStart");
          },
          onToken(token) {
            console.log("onToken", token);
          },
          onCompletion() {
            console.log("onCompletion");
          },
          onFinal(completion) {
            console.log("onFinal", completion);
          },
        },
      ),
      {
        headers: { "Content-Type": "text/event-stream" },
      },
    );
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
