# AIJStack

Stack dedicated to run a generative AI system using Node.js.

## Technical Specs

Based on a 'RAG' Retrieval-Augmented Generation and powered by `Phi-2` LLM.

| Layer                | Node.js Tool/Lib                                             | Notes                                       |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| **Document loader**  | `fs`, `pdf-parse`, `mammoth`, `textract`                     | Read `.txt`, `.pdf`, `.docx`, etc.          |
| **Chunking**         | `wink-nlp`                                                   | Create overlapping chunks                   |
| **Embeddings**       | `@tensorflow-models/universal-sentence-encoder`              | Local: TensorFlow\.js; Remote: OpenAI, etc  |
| **Vector search**    | `vectra`, `hnswlib-node`, `chromadb-node`, `weaviate-client` | Store and retrieve embedded chunks          |
| **RAG Framework**    | `langchainjs`                                                | Chain together: Retrieval + Generation      |
| **LLM**              | `Phi-2`                                                      | Use the local API                           |
| **Fine Tuning**      | `gguf`                                                       | Teach model new info (HuggingFace)          |
| **Quantization**     | `gguf`                                                       | Make model smaller and faster (HuggingFace) |
| **Bot Serving**      | `Vite`                                                       | Serve chatbot as REST, WebSocket, or UI     |

ChatGPT log discussion 27-06-2025

## Installatiuon steps

### LLM server instance
The current instance is developed with Python 3.10 and should use the below statement for dependecies installation,

`pip/pip3.10 install fastapi uvicorn torch transformers accelerate`
