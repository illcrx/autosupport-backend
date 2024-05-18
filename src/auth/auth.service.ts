import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(authDto: AuthDto) {
    const user = await this.validateUser(authDto.username, authDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(authDto: AuthDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { username: authDto.username },
    });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(authDto.password, salt);

    const role = await this.rolesRepository.findOne({ where: { name: 'user' } });

    if (!role) {
      throw new UnauthorizedException('Default role not found');
    }

    const newUser = this.usersRepository.create({
      username: authDto.username,
      password: hashedPassword,
      role,
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getProfile(userId: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  async updateProfile(
    userId: number,
    updateData: Partial<User>,
  ): Promise<User> {
    await this.usersRepository.update(userId, updateData);
    return this.usersRepository.findOne({ where: { id: userId } });
  }
}
