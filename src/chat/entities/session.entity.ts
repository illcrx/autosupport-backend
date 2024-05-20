import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Query } from './query.entity'; // Assuming a Query entity to store individual queries

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Query, query => query.session)
  queries: Query[];
}
