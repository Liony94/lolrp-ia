import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserQueryService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    return user;
  }

  async findOneByName(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec le username ${username} non trouvé`);
    }
    return user;
  }

  async findUserWithMoreVictories(): Promise<User> {
    const users = await this.userRepository.find({
      where: {},
      order: { victories: 'DESC' },
      take: 1,
    });

    if (!users[0]) {
      throw new NotFoundException('Aucun utilisateur trouvé');
    }

    return users[0];
  }
} 