# AIJStack
AI stack that runs on nodejs instance and based on 'RAG' Retrieval-Augmented Generation

## Stack architecture
The below table is describing the main componensts that build the current stack

| Layer                | Node.js Tool/Lib                                             | Notes                                       |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| **Document loader**  | `fs`                                                         | Read (raw) `.txt`, `.html`                  |
| **RAG Framework**    | `langchainjs`                                                | Chain together: Retrieval + Generation      |
| **LLM**              | `EleutherAI/gpt-neo-125M`                                    | Use the local API                           |

Based on `chatGPT` discussion 27-06-2025

## Example project instance
The current instance is running a generative chat supplying basic response on a specific theme

## Installation steps

Nodejs based project installation
    `npm install`

LLM model installation (python 3.1)
    `pip/pip3.10 install fastapi uvicorn torch transformers accelerate pydantic`

## How to run it?

1. Run both nodejs and model script instance with `npm run start-dev:all`
2. Send a HTTP type POST message to the `http://localhost:3000/generate` (i.e : {"query" : "What is NestJS ?"})
3. Expecting HTTP '201' response type from model