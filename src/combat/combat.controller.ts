import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { CombatService } from './combat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('combat')
export class CombatController {
  constructor(private readonly combatService: CombatService) {}

  @UseGuards(JwtAuthGuard)
  @Get('ops-with-same-level')
  async findOpsWithSameLevel(@Request() req) {
    return this.combatService.findOpsWithSameLevel(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('start-combat')
  async startCombat(@Request() req, @Body() body: { opponentId: string }) {
    return this.combatService.startCombat(req.user.id, body.opponentId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('process-turn')
  async processTurn(@Body() body: { combatId: string; isPlayerTurn: boolean }) {
    return this.combatService.processCombatTurn(
      body.combatId,
      body.isPlayerTurn,
    );
  }
}
