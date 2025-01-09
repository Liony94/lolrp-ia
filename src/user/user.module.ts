import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { UserQueryService } from './services/user-query.service';
import { UserStatsService } from './services/user-stats.service';
import { UserProgressionService } from './services/user-progression.service';
import { UserProfileService } from './services/user-profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    UserQueryService,
    UserStatsService,
    UserProgressionService,
    UserProfileService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
