import {
  Controller,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from '../register/dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { RegisterService } from './register.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './uploads/profiles',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() profileImage?: Express.Multer.File,
  ): Promise<User> {
    if (profileImage) {
      createUserDto.profileImage = profileImage.filename;
    }
    return this.registerService.create(createUserDto);
  }
}
