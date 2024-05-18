import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => UserProfile, userProfile => userProfile.user)
  profiles: UserProfile[];

  @ManyToOne(() => Role, role => role.users)
  role: Role;
}
