import torch
import uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM

app = FastAPI()

# Default values for the server
default_port_listenning = 8000
default_host_listenning = "127.0.0.1"   
default_logging_level = "info"

# Maximum number of tokens for generation
max_tokens_value = 200

# Load the model and tokenizer (small setup for testing purposes)
model_name = "EleutherAI/gpt-neo-125M"

# For this example, we will use a smaller model to ensure it runs smoothly
# previous configuration based on "microsoft/phi-2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, 
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
        outputs = model.generate(**inputs, max_new_tokens=max_tokens_value, do_sample=True, temperature=0.7)
        return {"response": tokenizer.decode(outputs[0], skip_special_tokens=True)}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, 
                host=default_host_listenning, 
                port=default_port_listenning, 
                log_level=default_logging_level)