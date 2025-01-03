import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RegisterModule } from './register/register.module';
import { CombatModule } from './combat/combat.module';
import { RegionModule } from './region/region.module';
import databaseConfig from './config/database.config';
import { User } from './entities/user.entity';
import { Region } from './entities/region.entity';
import { Combat } from './entities/combat.entity';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { CombatController } from './combat/combat.controller';
import { CombatService } from './combat/combat.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: [User, Region, Combat],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Region, Combat]),
    UserModule,
    AuthModule,
    RegisterModule,
    CombatModule,
    RegionModule,
  ],
  controllers: [RegisterController, CombatController],
  providers: [RegisterService, CombatService],
})
export class AppModule {}
