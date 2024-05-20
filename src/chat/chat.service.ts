import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getChatResponse(message: string): Promise<string> {
    const apiKey = this.configService.get<string>('CHAT_API_KEY');
    const requestBody = {
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }],
      max_tokens: 150,
    };

    this.logger.log(`Sending request to ChatGPT API with body: ${JSON.stringify(requestBody)}`);
    this.logger.log(`Message type: ${typeof message}, Message: ${message}`);

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          'https://api.openai.com/v1/chat/completions',
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      this.logger.log(`Received response from ChatGPT API: ${JSON.stringify(response.data)}`);
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      this.logger.error(`Error making request to ChatGPT API: ${error.message}`);
      this.logger.error(`Error response data: ${JSON.stringify(error.response?.data)}`);
      throw new Error('Failed to fetch response from ChatGPT API');
    }
  }
}
