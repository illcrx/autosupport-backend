import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => UserProfile, (userProfile) => userProfile.user)
  profiles: UserProfile[];
}
