import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity'; // Import Device entity

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    TypeOrmModule.forFeature([Device]), // Add Device entity here
  ],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
