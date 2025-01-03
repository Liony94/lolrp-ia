import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('regions')
export class Region {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: '' })
  imageUrl: string;

  @Column({ type: 'simple-array', nullable: true })
  champions: string[];

  @OneToMany(() => User, (user) => user.region)
  users: User[];
}
