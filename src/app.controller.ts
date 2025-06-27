import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate')
  async generate(@Body('query') query: string) {
    return this.appService.generateWithOpenAI(query);
  }
}