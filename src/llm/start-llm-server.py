from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import uvicorn

app = FastAPI()

tokenizer = AutoTokenizer.from_pretrained("microsoft/phi-2")
model = AutoModelForCausalLM.from_pretrained("microsoft/phi-2", torch_dtype=torch.float16, device_map="auto")

## 
# Prompt Class definition
#
# Define the request model for the prompt
#
##
class Prompt(BaseModel):
    text: str

# Ensure the model is loaded correctly
@app.get("/")
async def read_root():
    return HTMLResponse(content='Welcome to the <a href="https://github.com/johnvanderton/aijstack">AIJStack</a> server!')

# Endpoint to generate text based on a prompt
@app.post("/generate")
async def generate(prompt: Prompt):
    inputs = tokenizer(prompt.text, return_tensors="pt").to(model.device)
    outputs = model.generate(**inputs, max_new_tokens=200)
    return {"response": tokenizer.decode(outputs[0], skip_special_tokens=True)}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)