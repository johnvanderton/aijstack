from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import uvicorn

app = FastAPI()

# For this example, we will use a smaller model to ensure it runs smoothly
# previous configuration based on "microsoft/phi-2"
tokenizer = AutoTokenizer.from_pretrained("EleutherAI/gpt-neo-125M")
model = AutoModelForCausalLM.from_pretrained("EleutherAI/gpt-neo-125M", 
                                             torch_dtype=torch.float32, 
                                             device_map="auto")

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
    try: 
        inputs = tokenizer(prompt.text, return_tensors="pt").to("cuda" if torch.cuda.is_available() else "cpu")
        outputs = model.generate(**inputs, max_new_tokens=200, do_sample=True, temperature=0.7)
        return {"response": tokenizer.decode(outputs[0], skip_special_tokens=True)}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)