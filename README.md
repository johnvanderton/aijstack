# AIJStack
AI stack built on Node.js and powered by `RAG` Retrieval-Augmented Generation

## Stack architecture
The below table is describing the stack abstractions

| Layer                | Node.js Tool/Lib                                             | Notes                                       |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| **Document loader**  | `fs`                                                         | Read (raw) `.txt`, `.html`                  |
| **RAG Framework**    | `langchainjs`                                                | Chain together: Retrieval + Generation      |
| **RAG Embeddings**   | `Xenova/all-MiniLM-L6-v2`                                    | Fast 384-dim sentence embeddings            |
| **LLM**              | `EleutherAI/gpt-neo-125M`                                    | Use a local model                           |

Initally based on `chatGPT` discussion 27-06-2025

## Example project instance

The current instance is running a generative chat supplying basic response on a specific theme

## Installation steps

Nodejs based project installation
    `npm install`

LLM model installation (python 3.1)
    `pip/pip3.10 install fastapi uvicorn torch transformers accelerate pydantic`

## How to run it?

1. Run both `nodejs` and model script instance with `npm run start-dev:all`
2. Dispose your documentation related to your running example into `/doc` folder. Note: Only 'html' and 'txt' files are supported
3. Send a HTTP type POST message to the `http://localhost:3000/generate` (i.e : {"query" : "What is <scope> ?"})
4. Expecting for a HTTP '201' response