import { Injectable } from '@nestjs/common';
import { UserQueryService } from './services/user-query.service';
import { UserStatsService } from './services/user-stats.service';
import { UserProgressionService } from './services/user-progression.service';
import { UserProfileService } from './services/user-profile.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userQueryService: UserQueryService,
    private readonly userStatsService: UserStatsService,
    private readonly userProgressionService: UserProgressionService,
    private readonly userProfileService: UserProfileService,
  ) {}

  findAll() {
    return this.userQueryService.findAll();
  }

  findOneById(id: string) {
    return this.userQueryService.findOneById(id);
  }

  findOneByName(username: string) {
    return this.userQueryService.findOneByName(username);
  }

  findUserWithMoreVictories() {
    return this.userQueryService.findUserWithMoreVictories();
  }

  updateStats(userId: string, updateData: Partial<User>) {
    return this.userStatsService.updateStats(userId, updateData);
  }

  getBattlePower(userId: string) {
    return this.userStatsService.updateBattlePower(userId);
  }

  updateLevel(userId: string, updateData: Partial<User>) {
    return this.userProgressionService.updateLevel(userId, updateData);
  }

  updateAvailablePoints(userId: string, points: number) {
    return this.userProgressionService.updateAvailablePoints(userId, points);
  }

  updateProfileImage(userId: string, imageFileName: string) {
    return this.userProfileService.updateProfileImage(userId, imageFileName);
  }

  getCurrentUser(userId: string) {
    return this.userProfileService.getCurrentUser(userId);
  }
}
