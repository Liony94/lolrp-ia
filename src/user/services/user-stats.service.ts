import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserStatsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async updateStats(userId: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findUserOrFail(userId);

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

    if (updateData.xp !== undefined) {
      user.xp = (user.xp || 0) + updateData.xp;
      
      while (user.xp >= 100) {
        user.level = (user.level || 1) + 1;
        user.xp = user.xp - 100;
        user.availablePoints = (user.availablePoints || 0) + 5;
      }
    }

    for (const [key, value] of Object.entries(updateData)) {
      if (allowedStats.includes(key)) {
        user[key] = value;
      }
    }

    user.updateBattlePower();
    return this.userRepository.save(user);
  }

  async updateBattlePower(userId: string): Promise<number> {
    const user = await this.findUserOrFail(userId);
    user.updateBattlePower();
    await this.userRepository.save(user);
    return user.battlePower;
  }

  private async findUserOrFail(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }
} 