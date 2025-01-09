import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async updateProfileImage(userId: string, imageFileName: string): Promise<User> {
    const user = await this.findUserOrFail(userId);
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
    return this.userRepository.save(user);
  }

  private async findUserOrFail(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }
} 