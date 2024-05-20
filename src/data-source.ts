import { DataSource } from 'typeorm';
import { User } from './auth/entities/user.entity';
import { UserProfile } from './auth/entities/user-profile.entity';
import { Role } from './auth/entities/role.entity';
import { Company } from './auth/entities/company.entity';
import { Device } from './chat/entities/device.entity';
import { Solution } from './chat/entities/solution.entity';
import { Session } from './chat/entities/session.entity';
import { Query } from './chat/entities/query.entity';
import { Conversation } from './auth/entities/conversation.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'superman admin',
  password: 'password',
  database: 'superman',
  entities: [User, UserProfile, Role, Company, Device, Solution, Session, Query, Conversation],
  synchronize: true, // Ensure this is true for development
});
