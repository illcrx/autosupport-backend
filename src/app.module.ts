import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './auth/entities/user.entity';
import { UserProfile } from './auth/entities/user-profile.entity';
import { Role } from './auth/entities/role.entity';
import { Company } from './auth/entities/company.entity';
import { Conversation } from './auth/entities/conversation.entity';
import { ChatModule } from './chat/chat.module';
import { Device } from './chat/entities/device.entity';
import { Solution } from './chat/entities/solution.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'superman admin',
      password: 'password',
      database: 'superman',
      entities: [User, UserProfile, Role, Company, Conversation, Device, Solution],
      synchronize: true,
      dropSchema: true, // Automatically drop the schema and recreate it
    }),
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
