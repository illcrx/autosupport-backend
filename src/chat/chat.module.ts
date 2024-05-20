import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { Solution } from './entities/solution.entity';
import { ChatGateway } from './chat.gateway'; // Import ChatGateway
import { Session } from './entities/session.entity'; // Import Session entity
import { Query } from './entities/query.entity'; // Import Query entity

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    TypeOrmModule.forFeature([Device, Solution, Session, Query]), // Add entities here
  ],
  providers: [ChatService, ChatGateway], // Add ChatGateway to providers
  controllers: [ChatController],
})
export class ChatModule {}
 