import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('username/:username')
  findByName(@Param('username') username: string): Promise<User> {
    return this.userService.findOneByName(username);
  }

  @Get('id/:id')
  findById(@Param('id') id: string): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Get('top-user')
  findTopUser(): Promise<User> {
    return this.userService.findUserWithMoreVictories();
  }

  @Post('profile-image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profiles',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BadRequestException('Seules les images sont autorisées!'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 2,
      },
    }),
  )
  async uploadProfileImage(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException("Aucun fichier n'a été uploadé");
    }

    console.log('User from token:', req.user);
    console.log('User ID:', req.user.id);

    return this.userService.updateProfileImage(req.user.id, file.filename);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req): Promise<User> {
    return this.userService.getCurrentUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-stats')
  async updateStats(
    @Request() req,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    const userId = req.user.id;
    return this.userService.updateStats(userId, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-level')
  async updateLevel(
    @Request() req,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    const userId = req.user.id;
    return this.userService.updateLevel(userId, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-available-points')
  async updateAvailablePoints(
    @Request() req,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    const userId = req.user.id;
    return this.userService.updateAvailablePoints(userId, updateData.availablePoints);
  }

  @UseGuards(JwtAuthGuard)
  @Get('battle-power')
  async getBattlePower(@Request() req): Promise<{ battlePower: number }> {
    const battlePower = await this.userService.getBattlePower(req.user.id);
    return { battlePower };
  }
}
