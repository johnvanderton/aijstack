import torch
import uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM

# FastAPI application instance, main entry point for the server
app = FastAPI()

# Default values for the server
default_logging_level = "info"  # Options: "debug", "info", "warning", "error", "critical"
default_port_listenning = 8000
default_host_listenning = "127.0.0.1"   

# Default values for the model generation parameters
default_do_sample_value = False
default_max_tokens_value = 200
default_no_repeat_ngram_size_value = 3
default_repetition_penalty_value = 1.5
default_temperature_value = 0.7

# Load the model and tokenizer (small setup for testing purposes)
model_name = "EleutherAI/gpt-neo-125M" #causal language models which is 
#model_name = "microsoft/phi-1_5" #too retest
#model_name = "microsoft/Phi-3-mini-4k-instruct" #too slow

# For this example, we will use a smaller model to ensure it runs smoothly
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, 
                                             torch_dtype=torch.float32, 
                                             device_map="auto")

## 
# 'Prompt' Class definition
#
# Define the request model for the prompt. It is a simple text input with optional parameters for generation.   
#
# Note: the LLM is just Predicting the next token given all previous tokens.
#
##
class Prompt(BaseModel):
    input: str
    max_new_tokens: int = default_max_tokens_value
    temperature: float = default_temperature_value
    do_sample: bool = default_do_sample_value
    repetition_penalty: float = default_repetition_penalty_value
    no_repeat_ngram_size: int = default_no_repeat_ngram_size_value

# Ensure the model is loaded correctly
@app.get("/")
async def read_root():
    return HTMLResponse(content='Welcome to the <a href="https://github.com/johnvanderton/aijstack">AIJStack</a> server!')

# Endpoint to generate text based on a prompt
@app.post("/generate")
async def generate(prompt: Prompt):
    try: 
        #print(f"Prompt input >> {prompt.input}")
        inputs = tokenizer(prompt.input, return_tensors="pt").to("cuda" if torch.cuda.is_available() else "cpu")
        outputs = model.generate(**inputs, 
                                    max_new_tokens=prompt.max_new_tokens,
                                    do_sample=prompt.do_sample, 
                                    #temperature=prompt.temperature, 
                                    eos_token_id=tokenizer.eos_token_id,
                                    repetition_penalty=prompt.repetition_penalty,
                                    no_repeat_ngram_size=prompt.no_repeat_ngram_size)
        return {tokenizer.decode(outputs[0], skip_special_tokens=True)}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, 
                host=default_host_listenning, 
                port=default_port_listenning, 
                log_level=default_logging_level)