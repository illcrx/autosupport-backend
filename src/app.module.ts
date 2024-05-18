import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './auth/entities/user.entity';
import { UserProfile } from './auth/entities/user-profile.entity';
import { Role } from './auth/entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'superman admin', // your new DB user
      password: 'password', // the password you set for the user
      database: 'superman', // the name of your new database
      entities: [User, UserProfile, Role],
      synchronize: true, // set to false in production
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
