import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Session } from './session.entity';

@Entity()
export class Query {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  response: string;

  @ManyToOne(() => Session, session => session.queries)
  session: Session;
}
