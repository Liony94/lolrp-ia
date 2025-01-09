import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserProgressionService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


  async updateAvailablePoints(userId: string, points: number): Promise<User> {
    const user = await this.findUserOrFail(userId);
    user.availablePoints = points;
    return this.userRepository.save(user);
  }

  async updateLevel(userId: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findUserOrFail(userId);
    user.level = updateData.level;
    user.updateBattlePower();
    return this.userRepository.save(user);
  }

  private async findUserOrFail(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
} 