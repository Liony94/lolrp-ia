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

  async findUserWithMoreVictories(): Promise<User> {
    const users = await this.userRepository.find({
      where: {},
      order: {
        victories: 'DESC',
      },
      take: 1,
    });

    const user = users[0];
    if (!user) {
      throw new NotFoundException('Aucun utilisateur trouvé');
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

  async getCurrentUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['region'],
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    user.updateBattlePower();
    await this.userRepository.save(user);

    return user;
  }

  async updateUserStats(
    userId: string,
    updateData: Partial<User>,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const allowedStats = [
      'vie',
      'defense',
      'attaque',
      'puissance',
      'esquive',
      'endurance',
      'victories',
      'defeats',
    ];

    for (const [key, value] of Object.entries(updateData)) {
      if (allowedStats.includes(key)) {
        user[key] = value;
      }
    }

    user.updateBattlePower();

    return this.userRepository.save(user);
  }

  async updateAvailablePoints(
    userId: string,
    updateData: Partial<User>,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    user.availablePoints = updateData.availablePoints;
    user.updateBattlePower();
    return this.userRepository.save(user);
  }

  async updateLevel(userId: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    user.level = updateData.level;
    user.updateBattlePower();
    return this.userRepository.save(user);
  }

  async getBattlePower(userId: string): Promise<number> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    user.updateBattlePower();
    await this.userRepository.save(user);

    return user.battlePower;
  }
}
