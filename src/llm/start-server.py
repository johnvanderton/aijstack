import logging
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
model_name = "EleutherAI/gpt-neo-125M" #causal language models which is 
#model_name = "microsoft/Phi-3-mini-4k-instruct" #too slow
#model_name = "google/gemma-2b-it" #too slow #need login
#model_name = "microsoft/phi-1_5"
#model_name =  "stabilityai/stablelm-2-1_6b-chat"

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
# Note: the LLM is just Predicting the next token given all previous tokens.
#
# The prompt is a simple text input with optional parameters for generation.   
#
##
class Prompt(BaseModel):
    input: str
    max_new_tokens: int = 50
    temperature: float = 0.7
    do_sample: bool = False

# Ensure the model is loaded correctly
@app.get("/")
async def read_root():
    return HTMLResponse(content='Welcome to the <a href="https://github.com/johnvanderton/aijstack">AIJStack</a> server!')

# Endpoint to generate text based on a prompt
@app.post("/generate")
async def generate(prompt: Prompt):
    try: 
        # print(f"Prompt input >> {prompt.input}")
        inputs = tokenizer(prompt.input, return_tensors="pt").to("cuda" if torch.cuda.is_available() else "cpu")
        outputs = model.generate(**inputs, 
                                    max_new_tokens=max_tokens_value, 
                                    do_sample=False, 
                                    temperature=0.7, 
                                    eos_token_id=tokenizer.eos_token_id,
                                    repetition_penalty=1.5,
                                    no_repeat_ngram_size=3)
        return {"response": tokenizer.decode(outputs[0], skip_special_tokens=True)}
    except Exception as e:
        import traceback

if __name__ == "__main__":
    uvicorn.run(app, 
                host=default_host_listenning, 
                port=default_port_listenning, 
                log_level=default_logging_level)