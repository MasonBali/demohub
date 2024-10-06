from fastapi import FastAPI
from pydantic import BaseModel
from llama import Llama

# app = FastAPI()
# llm = Llama(model_path=<PAtH_TO_MODEL>)

# class InferenceRequest(BaseModel):
#     prompt: str

# @app.post("/complete")
# def perform_inference(request: InferenceRequest):
#     output = llm(
#         request.prompt,
#         max_tokens=48,
#         stop=["Q:", "\n"],
#         echo=True,
#     )
#     return {"data": output}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
