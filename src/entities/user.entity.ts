import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Region } from './region.entity';
import { Combat } from './combat.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Combat, (combat) => combat.user)
  combats: Combat[];

  @OneToMany(() => Combat, (combat) => combat.opponent)
  combatsAsOpponent: Combat[];

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

  @Column({ default: 1 })
  level: number;

  @Column({ nullable: true })
  availablePoints: number;

  @Column({ default: 500 })
  vie: number;

  @Column({ default: 50 })
  defense: number;

  @Column({ default: 70 })
  attaque: number;

  @Column({ default: 70 })
  puissance: number;

  @Column({ default: 30 })
  criticalDmg: number;

  @Column({ default: 5 })
  criticalChance: number;

  @Column({ default: 5 })
  precision: number;

  @Column({ default: 15 })
  esquive: number;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
