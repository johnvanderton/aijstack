import { Injectable } from '@nestjs/common';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { Document } from 'langchain/document';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import * as fs from 'fs';
import * as path from 'path';

/**
 * `RAGService` Class Definition
 *
 * Service for handling RAG (Retrieval-Augmented Generation) operations.
 */
@Injectable()
export class RAGService {

  /**
   * `vectorStore` Property Definition
   * 
   * This property holds the vector store instance used for similarity search operations
   */
  private vectorStore!: MemoryVectorStore;

  /**
   * `fileExtensions` Property Definition
   */
  private readonly fileExtensions = ['.txt', '.pdf', '.xlsx', '.db', '.docx', '.pptx', '.csv', '.md', '.json', 'html'];

  /**
   * `documentsPath` Property Definition
   */
  private readonly documentsPath = '../../documents';

  /**
   * Constructor
   */
  constructor() {
    this.loadDocuments();
  }

  /**
   * `loadDocuments` Method Definition
   * 
   * Loads documents from the specified directory and initializes the vector store. This method reads text files, splits them into 
   * smaller chunks, and creates embeddings for the chunks. It uses a mock embedding model for demonstration purposes, which should 
   * be replaced with a local embedding model in production.
   * 
   * @returns {Promise<void>}
   */
  async loadDocuments() {
    const docsPath = path.resolve(__dirname, this.documentsPath);

    /**
     * Read all files from the documents directory
     */
    const files = fs.readdirSync(docsPath).filter(f =>
      this.fileExtensions.includes(path.extname(f).toLowerCase())
    );

    /**
     * Create files container
     */
    const docs: Document[] = [];

    /**
     * For each file found in the documents directory, load the file content and add it to the documents array
     */
    for (const file of files) {
      const loader = new TextLoader(path.join(docsPath, file));
      const loaded = await loader.load();
      docs.push(...loaded);
    }

    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 200, chunkOverlap: 20 });
    const splitDocs = await splitter.splitDocuments(docs);
    
    const embeddings = {
      embedQuery: async (text: string) => Array(512).fill(0.1), // mock embedding
      embedDocuments: async (texts: string[]) => texts.map(() => Array(512).fill(0.1)),
    };

    /**
     * Initializes the vector store with document embeddings
     */
    this.vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
  }

  /**
   * `getContext` Method Definition
   * 
   * Retrieves context for a given query by performing a similarity search based on the vector store.
   * 
   * @param query 
   * @returns 
   */
  async getContext(query: string): Promise<string> {
    const results = await this.vectorStore.similaritySearch(query, 3);
    return results.map(r => r.pageContent).join('\n');
  }
  
}