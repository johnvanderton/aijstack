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
   * todo : map and concatenate the context and query into a single input string like this:
   * {"input" : "Context: Berlin is the capital city of Germany. It is known for the Brandenburg Gate and the Reichstag.\nQuestion: What is Berlin famous for?\nAnswer:"}
   * 
   * @param context The context to provide to the model
   * @param query The query to ask the model
   * @returns The model's response
   */
  async callLocalModel(context: string, query: string): Promise<string> {
    console.log('Calling local model with context:', context, 'and query:', query);
    // seems that the llm is not expecting for context and query to be passed as an object
    const response = await axios.post('http://localhost:8000/generate', {
      context,
      query,
    });
    return response.data.answer;
    //return `Answer (mocked): Based on:\n${context}\n\nQuery: ${query}`;
  }

}