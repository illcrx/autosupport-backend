import { Module, HttpModule } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
