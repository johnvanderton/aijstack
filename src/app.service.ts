import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

@Injectable()
export class AppService {
  async generateWithOpenAI(query: string): Promise<any> {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant using RAG.' },
        { role: 'user', content: query },
      ],
    });

    return {
      query,
      response: response.data.choices[0].message?.content,
    };
  }
}