import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { Role } from './role.entity';
import { Company } from './company.entity';
import { Conversation } from './conversation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Role, role => role.users, { nullable: true })
  role: Role;

  @ManyToOne(() => Company, company => company.users, { nullable: true })
  company: Company;

  @OneToMany(() => UserProfile, userProfile => userProfile.user, { nullable: true })
  profiles: UserProfile[];

  @OneToMany(() => Conversation, conversation => conversation.user, { nullable: true })
  conversations: Conversation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
