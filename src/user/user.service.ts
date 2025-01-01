import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
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
      throw new NotFoundException(
        `Utilisateur avec le username ${username} non trouvé`,
      );
    }
    return user;
  }

  async updateProfileImage(
    userId: string,
    imageFileName: string,
  ): Promise<User> {
    const user = await this.findOneById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    user.profileImage = imageFileName;
    return this.userRepository.save(user);
  }
}
