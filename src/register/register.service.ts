import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Region } from 'src/entities/region.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    let region = await this.regionRepository.findOne({
      where: { name: createUserDto.region },
    });

    if (!region) {
      region = this.regionRepository.create({
        name: createUserDto.region,
        description:
          createUserDto.region === 'demacia'
            ? "Un puissant royaume valorisant la justice et l'honneur"
            : "Un empire expansionniste guidé par la force et l'ambition",
      });
      await this.regionRepository.save(region);
    }

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      region,
      vie: 500,
      defense: 50,
      attaque: 70,
      puissance: 70,
      criticalDmg: 30,
      criticalChance: 5,
      precision: 5,
      esquive: 15,
    });
    user.updateBattlePower();
    return this.userRepository.save(user);
  }
}
