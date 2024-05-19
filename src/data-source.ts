import { DataSource } from 'typeorm';
import { User } from './auth/entities/user.entity';
import { UserProfile } from './auth/entities/user-profile.entity';
import { Role } from './auth/entities/role.entity';
import { Company } from './auth/entities/company.entity';
import { Conversation } from './auth/entities/conversation.entity';
import { Device } from './chat/entities/device.entity';
import { Solution } from './chat/entities/solution.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'superman admin',
  password: 'password',
  database: 'superman',
  entities: [User, UserProfile, Role, Company, Conversation, Device, Solution],
  synchronize: true,
});
