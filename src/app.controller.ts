import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 
   * @param query 
   * @returns 
   */
  @Get('/')
  async root_query() {
    return "Welcome to the AIJStack API. Use /generate endpoint to generate responses.";
  }

  /**
   * 
   * `generate` Method Definition
   * 
   * Generates an answer based on the provided query.
   * 
   * @param query 
   * @returns 
   */
  @Post('generate')
  async generate(@Body('query') query: string) {
    return this.appService.generate(query);
  }

}