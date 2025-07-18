# AIJStack

AI stack based on 'RAG' Retrieval-Augmented Generation and `EleutherAI/gpt-neo-125M` LLM model.

| Layer                | Node.js Tool/Lib                                             | Notes                                       |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| **Document loader**  | `fs`, `pdf-parse`, `mammoth`, `textract`                     | Read `.txt`, `.pdf`, `.docx`, etc.          |
| **Chunking**         | `wink-nlp`                                                   | Create overlapping chunks                   |
| **Embeddings**       | `@tensorflow-models/universal-sentence-encoder`              | Local: TensorFlow\.js; Remote: OpenAI, etc  |
| **Vector search**    | `vectra`, `hnswlib-node`, `chromadb-node`, `weaviate-client` | Store and retrieve embedded chunks          |
| **RAG Framework**    | `langchainjs`                                                | Chain together: Retrieval + Generation      |
| **LLM**              | `EleutherAI/gpt-neo-125M`                                    | Use the local API                           |
| **Fine Tuning**      | `gguf`                                                       | Teach model new info (HuggingFace)          |
| **Quantization**     | `gguf`                                                       | Make model smaller and faster (HuggingFace) |
| **Bot Serving**      | `Vite`                                                       | Serve chatbot as REST, WebSocket, or UI     |

ChatGPT log discussion 27-06-2025

## Installation steps

### LLM server instance
The current instance is developed with Python 3.10 and should use the below statement for dependecies installation,

`pip/pip3.10 install fastapi uvicorn torch transformers accelerate pydantic`
