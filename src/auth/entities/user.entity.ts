import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { Role } from './role.entity';
import { Company } from './company.entity';
import { Conversation } from './conversation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @ManyToOne(() => Role, role => role.users)
  role: Role;

  @ManyToOne(() => Company, company => company.users)
  company: Company;

  @OneToOne(() => UserProfile, userProfile => userProfile.user)
  userProfile: UserProfile;

  @OneToMany(() => Conversation, conversation => conversation.user)
  conversations: Conversation[];

  @OneToMany(() => UserProfile, userProfile => userProfile.user) // Add this line
  profiles: UserProfile[]; // Add this line
}
