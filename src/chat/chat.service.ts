import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async getChatResponse(message: string): Promise<any> {
    const apiKey = this.configService.get<string>('CHAT_API_KEY');
    const response = await this.httpService.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: message,
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      },
    ).toPromise();
    return response.data;
  }
}
