# AIJStack

A setup for building and running a generative AI system using Node.js.

## Technical Specs

Based on 'RAG' Retrieval-Augmented Generation using minimal configuration.

| Layer               | Node.js Tool/Lib                                             | Notes                                       |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------- |
|**Document loader**  | `fs`, `pdf-parse`, `mammoth`, `textract`                     | Read `.txt`, `.pdf`, `.docx`, etc.          |
| **Chunking**        | `wink-nlp`                                                   | Create overlapping chunks                   |
| **Embeddings**      | `@tensorflow-models/universal-sentence-encoder`              | Local: TensorFlow\.js; Remote: OpenAI, etc  |
| **Vector search**   | `vectra`, `hnswlib-node`, `chromadb-node`, `weaviate-client` | Store and retrieve embedded chunks          |
| **LLM**             | `openai`, `langchainjs`                                      | Use local models or API like OpenAI         |
| **RAG Framework**   | `langchainjs`                                                | Chain together: Retrieval + Generation      |
| **Fine Tuning**     | `gguf`                                                       | Teach model new info (HuggingFace)          |
| **Quantization**    | `gguf`                                                       | Make model smaller and faster (HuggingFace) |
| **Bot Serving**     | `Vite`                                                       | Serve chatbot as REST, WebSocket, or UI     |

ChatGPT discussion log report 27-06-2025
