import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';
import { Role } from './entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Blacklist } from './blacklist.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller'; // Add this import
import { SessionService } from './session.service'; // Add this import

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, Role, Blacklist]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RoleService,
    UserService,
    SessionService,
  ],
  controllers: [AuthController, RoleController, UserController],  // Add UserController here
  exports: [AuthService],
})
export class AuthModule {}
