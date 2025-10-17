# AIJStack
AI stack built on Node.js and powered by `RAG` Retrieval-Augmented Generation

## Stack architecture
The below table is describing the different layer abstractions

| Layer               | Node.js Tool/Lib                  | Notes                                     |
|---------------------|-----------------------------------|-------------------------------------------|
| **Document loader** | `fs`                              | Read (raw) `.txt`                         |
| **RAG Framework**   | `langchainjs`                     | Chain together: Retrieval + Generation    |
| **RAG Embeddings**  | `Xenova/all-MiniLM-L6-v2`         | Fast 384-dim sentence embeddings          |
| **LLM**             | `EleutherAI/gpt-neo-125M`         | Use a local model                         |

Initally based on `chatGPT` discussion 27-06-2025

## Example project instance

The current instance is running a generative chat supplying basic response on a specific theme (doc)

## Installation steps

Use the 'installation' script which is,
    - Creates a virtual environment `.venv`
    - Imports the following package into this new environment (fastapi, uvicorn, torch, transformers, accelerate, pydantic)

## How to run it?

1. Run both `nodejs` and `model` script instances with `npm run start-dev:all` command
2. Dispose your documentation related to your running example into `/doc` folder. Note: Only 'html' and 'txt' files are supported
3. Send a POST HTTP JSON message to `http://localhost:3000/generate` i.e : {"query" : "What is (your scope) ?"}
4. Expecting for a HTTP '201' JSON message response