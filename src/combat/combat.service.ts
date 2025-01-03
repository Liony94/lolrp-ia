import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Combat } from 'src/entities/combat.entity';
import { User } from 'src/entities/user.entity';
import { Between, Not, Repository } from 'typeorm';

@Injectable()
export class CombatService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Combat)
    private combatRepository: Repository<Combat>,
  ) {}

  async findOpsWithSameLevel(userId: string): Promise<User[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Calcul du niveau minimum et maximum pour les adversaires
    const minLevel = Math.max(1, user.level - 5);
    const maxLevel = user.level + 5;

    return this.userRepository.find({
      where: {
        level: Between(minLevel, maxLevel),
        id: Not(userId),
      },
    });
  }

  async startCombat(userId: string, opponentId: string): Promise<Combat> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const opponent = await this.userRepository.findOne({
      where: { id: opponentId },
    });

    if (!user || !opponent) {
      throw new NotFoundException('Utilisateur ou adversaire non trouvé');
    }

    const combat = new Combat();
    combat.user = user;
    combat.opponent = opponent;
    combat.status = 'in_progress';
    combat.userCurrentHp = user.vie;
    combat.opponentCurrentHp = opponent.vie;

    return this.combatRepository.save(combat);
  }

  async processCombatTurn(
    combatId: string,
    isPlayerTurn: boolean,
  ): Promise<{
    damage: number;
    isCritical: boolean;
    isDodged: boolean;
    currentHealth: number;
    isFinished: boolean;
    winner?: User;
  }> {
    const combat = await this.combatRepository.findOne({
      where: { id: combatId },
      relations: ['user', 'opponent'],
    });

    if (!combat) {
      throw new NotFoundException('Combat non trouvé');
    }

    // On determine l'attaquant et le défenseur selon le tour
    const attacker = isPlayerTurn ? combat.user : combat.opponent;
    const defender = isPlayerTurn ? combat.opponent : combat.user;

    let currentDefenderHp = isPlayerTurn
      ? combat.opponentCurrentHp
      : combat.userCurrentHp;

    const attackerPower = attacker.attaque + attacker.puissance;
    const defenderDefense = defender.defense;

    let damage = attackerPower * (100 / (100 + defenderDefense));

    const isCritical = Math.random() * 100 < attacker.criticalChance;
    if (isCritical) {
      damage *= 1 + attacker.criticalDmg / 100;
    }

    const baseHitChance = 95;
    const hitChance = Math.min(100, baseHitChance + attacker.precision);
    const dodgeChance = Math.min(75, defender.esquive / 2);
    const finalHitChance = Math.max(20, hitChance - dodgeChance);

    const isDodged = Math.random() * 100 > finalHitChance;
    if (isDodged) {
      damage = 0;
    }

    currentDefenderHp -= Math.round(damage);

    if (isPlayerTurn) {
      combat.opponentCurrentHp = currentDefenderHp;
    } else {
      combat.userCurrentHp = currentDefenderHp;
    }

    const isFinished = currentDefenderHp <= 0;
    let winner = null;

    if (isFinished) {
      combat.status = 'finished';
      winner = attacker;
    }

    await this.combatRepository.save(combat);

    return {
      damage: Math.round(damage),
      isCritical,
      isDodged,
      currentHealth: currentDefenderHp,
      isFinished,
      winner,
    };
  }
}
