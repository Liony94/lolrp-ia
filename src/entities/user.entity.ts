import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Region } from './region.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Region, (region) => region.users)
  @JoinColumn()
  region: Region;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ default: 500 })
  vie: number;

  @Column({ default: 50 })
  defense: number;

  @Column({ default: 70 })
  attaque: number;

  @Column({ default: 70 })
  puissance: number;

  @Column({ default: 70 })
  esquive: number;

  @Column({ default: 70 })
  endurance: number;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
