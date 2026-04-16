# AIJStack
AI stack built on Node.js and powered by `RAG` Retrieval-Augmented Generation

## Stack architecture
The below table is describing the different layer abstractions

| Layer               | Node.js Tool/Lib                  | Notes                                     |
|---------------------|-----------------------------------|-------------------------------------------|
| **Document loader** | `fs`                              | -                                         |
| **Document Parser** | `langchain`                       | File format supported  `txt`              |
| **RAG Framework**   | `langchain`                       | Chain together: Retrieval + Generation    |
| **RAG Embeddings**  | `Xenova/all-MiniLM-L6-v2`         | Fast 384-dim sentence embeddings          |
| **LLM**             | `EleutherAI/gpt-neo-125M`         | Lightweight Model                         |

Initally based on `chatGPT` discussion, 27-06-2025

## Example project instance

The current instance is running a generative chat supplying basic response on a specific theme

## Prerequirements

- Python `3.9`, later version are not yet covered by torch prebuilt
- Nodejs version >= `18.0` (not tested)
- English documentation is only supported by LLM

## Installation steps

Perform global installation
    
Use the `installation` script (or `npm run installation`) which is performing the following sub scripts,

- `_js-env_install` script dedicated to node environment
- `_py-env_install` script dedicated to python environment

Note,

`py-env_install` script is creating a `.venv` virtual environment and imports the following packages (fastapi, uvicorn, torch, transformers, accelerate, pydantic)

## How to run it?

1. Dispose your documentation into the `/doc` folder. Note: Currently only 'txt' files are supported
2. Run both `nodejs` and `model` script instances with `quick-start` or `npm run start-dev:all`
3. Send through HTTP POST a JSON message to `http://localhost:3000/generate` i.e : {"query" : "What is (your scope) ?"}
4. Expecting for a HTTP '201' JSON message response (json anwser response : Context... > Question... > Answer...) 
