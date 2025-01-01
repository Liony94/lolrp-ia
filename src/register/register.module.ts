import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Region } from '../entities/region.entity';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Region])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
