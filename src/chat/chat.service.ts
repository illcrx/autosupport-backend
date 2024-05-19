import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async getChatResponse(message: string): Promise<any> {
    const apiKey = this.configService.get<string>('CHAT_API_KEY');
    const response = await lastValueFrom(
      this.httpService.post(
        'https://api.openai.com/v1/chat/completions', // Updated endpoint
        {
          model: 'gpt-4', // Specify the model
          messages: [{ role: 'user', content: message }],
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      ),
    );
    return response.data.choices[0].message.content; // Return the chat message content
  }
}
