import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './auth/entities/user.entity';
import { UserProfile } from './auth/entities/user-profile.entity';
import { Role } from './auth/entities/role.entity';
import { ChatModule } from './chat/chat.module';
import { Device } from './chat/entities/device.entity'; // Import Device entity

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
      entities: [User, UserProfile, Role, Device], // Add Device entity here
      synchronize: true,
    }),
    AuthModule,
    ChatModule, // Ensure ChatModule is imported here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
