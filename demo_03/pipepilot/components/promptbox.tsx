import { useChat } from "ai/react";
import { useEffect } from "react";

export default function PromptBox() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  useEffect(() => {
    if (!isLoading) {
      console.log("Messages FINISHED:", messages);
    }
  }, [messages, isLoading]);

  return (
    <>
      <div className="flex h-full w-full flex-col overflow-auto rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 p-5 backdrop-filter">
        {messages.map((message) => (
          <div
            key={message.id}
            className="whitespace-pre-wrap"
            style={{ color: message.role === "user" ? "orange" : "white" }}
          >
            <strong>{`${message.role}: `}</strong>
            {message.content}
            <br />
          </div>
        ))}
      </div>
      {isLoading ? (
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-orange-400">
          <div className="absolute h-full w-3/4 animate-ping rounded-full bg-yellow-200" />
        </div>
      ) : (
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-white bg-opacity-20 backdrop-filter" />
      )}

      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full overflow-auto rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 p-2 backdrop-filter">
          <input
            className="h-full w-full resize-none rounded-md bg-transparent p-2 text-lg text-white outline-none"
            value={input}
            placeholder="Write something and hit enter..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
      </form>
    </>
  );
}
