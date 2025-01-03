import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('combats')
export class Combat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.combats)
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, (user) => user.combats)
  @JoinColumn()
  opponent: User;

  @Column()
  status: string;

  @Column({ default: 0 })
  userCurrentHp: number;

  @Column({ default: 0 })
  opponentCurrentHp: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
