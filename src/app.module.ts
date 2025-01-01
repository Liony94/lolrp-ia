import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import { User } from './entities/user.entity';
import { Region } from './entities/region.entity';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
    }),
    TypeOrmModule.forFeature([User, Region]),
    UserModule,
    AuthModule,
    RegisterModule,
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class AppModule {}
