/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  async create(
    createUserProfileDto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    const userProfile = this.userProfileRepository.create(createUserProfileDto);
    return this.userProfileRepository.save(userProfile);
  }

  async findAll(): Promise<UserProfile[]> {
    return this.userProfileRepository.find();
  }

  async findOne(id: number): Promise<UserProfile> {
    return this.userProfileRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    await this.userProfileRepository.update(id, updateUserProfileDto);
    return this.userProfileRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userProfileRepository.delete(id);
  }
}
