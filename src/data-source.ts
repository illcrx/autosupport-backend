import { DataSource } from 'typeorm';
import { User } from './auth/entities/user.entity';
import { UserProfile } from './auth/entities/user-profile.entity';
import { Role } from './auth/entities/role.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'superman admin', // your new DB user
  password: 'password', // the password you set for the user
  database: 'superman', // the name of your new database
  entities: [User, UserProfile, Role],
  synchronize: true, // set to false in production
});
