import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } }) // Enable CORS for WebSocket
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: string): Promise<void> { // Use 'string' to handle the payload directly
    this.logger.log(`Message received from client ${client.id}: ${payload}`);
    this.logger.log(`Payload structure: ${payload}`); // Log the payload structure
    
    const messageContent = payload;
    
    this.logger.log(`Extracted message content: ${messageContent}`);
    this.logger.log(`Payload message type: ${typeof messageContent}, Payload message: ${messageContent}`);
    
    try {
      if (!messageContent) {
        this.logger.error('Received message content is invalid or empty.');
        client.emit('receiveMessage', { content: 'Error: Message content is empty.', sender: 'ChatGPT' });
        return;
      }
      const response = await this.chatService.getChatResponse(messageContent);
      this.logger.log(`Response from ChatGPT: ${response}`);
      client.emit('receiveMessage', { content: response, sender: 'ChatGPT' });
    } catch (error) {
      this.logger.error(`Error processing message: ${error.message}`);
      client.emit('receiveMessage', { content: 'Error processing your message. Please try again later.', sender: 'ChatGPT' });
    }
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
