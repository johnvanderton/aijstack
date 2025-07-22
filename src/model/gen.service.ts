import { Injectable } from '@nestjs/common';
import axios from 'axios';

/**
 * `GenService` Method Definition
 *
 * Service that provides methods to compute and invoke generative answers from the local model (LLM)
 *
 */
@Injectable()
export class GenService {

  /**
   * Calls the local model with the given context and query
   * 
   * @param context The context to provide to the model
   * @param query The query to ask the model
   * @returns The model's response
   */
  async callLocalModel(context: string, query: string): Promise<string> {
    const payload = {"input": `Context: ${context}\nQuestion: ${query}\nAnswer:`};
    const response = await axios.post('http://localhost:8000/generate', payload);
    return JSON.stringify(response.data, null, 2); //return the full response for debugging
    //return response.data.answer; //return undefined if no answer is provided
  }

}