import { Controller, Body, Post } from '@nestjs/common';
import { CreateUserDto } from '../register/dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post('new')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.registerService.create(createUserDto);
  }
}
