import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from '../entities/region.entity';

@Injectable()
export class RegionService implements OnModuleInit {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async onModuleInit() {
    console.log('Initialisation du module Region...');
    const count = await this.regionRepository.count();
    console.log(`Nombre de régions trouvées : ${count}`);

    if (count === 0) {
      console.log("Démarrage de l'initialisation des régions...");
      try {
        await this.seedRegions();
        console.log('Régions initialisées avec succès');
      } catch (error) {
        console.error("Erreur lors de l'initialisation des régions:", error);
      }
    } else {
      console.log('Les régions sont déjà initialisées');
    }
  }

  async findAll(): Promise<Region[]> {
    return this.regionRepository.find();
  }

  async seedRegions() {
    const regions = [
      {
        name: 'Demacia',
        description:
          'Un royaume puissant et vertueux avec une forte tradition militaire et une aversion pour la magie.',
        imageUrl: 'url_image_demacia',
        champions: ['Garen', 'Lux', 'Jarvan IV', 'Quinn'],
      },
      {
        name: 'Noxus',
        description:
          "Un empire expansionniste qui valorise la force et l'ambition au-dessus de tout.",
        imageUrl: 'url_image_noxus',
        champions: ['Darius', 'Swain', 'Katarina', 'Sion'],
      },
      {
        name: 'Ionia',
        description:
          'Une terre de magie naturelle et de spiritualité profonde.',
        imageUrl: 'url_image_ionia',
        champions: ['Irelia', 'Karma', 'Master Yi', 'Shen'],
      },
      {
        name: 'Freljord',
        description:
          'Une terre glaciale où trois tribus se disputent le contrôle du territoire.',
        imageUrl: 'url_image_freljord',
        champions: ['Ashe', 'Sejuani', 'Lissandra', 'Braum'],
      },
      {
        name: 'Piltover',
        description:
          'La cité du progrès, connue pour ses avancées technologiques.',
        imageUrl: 'url_image_piltover',
        champions: ['Caitlyn', 'Vi', 'Jayce', 'Heimerdinger'],
      },
      {
        name: 'Zaun',
        description:
          'La ville sous Piltover, où la science rencontre le danger.',
        imageUrl: 'url_image_zaun',
        champions: ['Ekko', 'Jinx', 'Viktor', 'Warwick'],
      },
      {
        name: 'Shurima',
        description: 'Un ancien empire du désert renaissant de ses cendres.',
        imageUrl: 'url_image_shurima',
        champions: ['Azir', 'Sivir', 'Nasus', 'Renekton'],
      },
      {
        name: 'Bilgewater',
        description:
          "Un port de pirates où règnent le chaos et l'opportunisme.",
        imageUrl: 'url_image_bilgewater',
        champions: ['Miss Fortune', 'Gangplank', 'Pyke', 'Twisted Fate'],
      },
    ];

    console.log(
      `Tentative de mise à jour/insertion de ${regions.length} régions`,
    );

    for (const regionData of regions) {
      try {
        const existingRegion = await this.regionRepository.findOne({
          where: { name: regionData.name },
        });

        if (existingRegion) {
          // Mise à jour de la région existante
          console.log(`Mise à jour de la région : ${regionData.name}`);
          await this.regionRepository.update(
            { id: existingRegion.id },
            {
              description: regionData.description,
              imageUrl: regionData.imageUrl,
              champions: regionData.champions,
            },
          );
          console.log(`Région ${regionData.name} mise à jour avec succès`);
        } else {
          // Création d'une nouvelle région
          console.log(`Création de la région : ${regionData.name}`);
          await this.regionRepository.save(regionData);
          console.log(`Région ${regionData.name} créée avec succès`);
        }
      } catch (error) {
        console.error(
          `Erreur lors du traitement de la région ${regionData.name}:`,
          error,
        );
      }
    }
  }

  async reinitializeRegions() {
    console.log('Suppression de toutes les régions...');
    await this.regionRepository.clear();
    console.log('Réinitialisation des régions...');
    await this.seedRegions();
    console.log('Régions réinitialisées avec succès');
  }

  // Méthode pour ajouter une nouvelle région
  async addRegion(regionData: {
    name: string;
    description: string;
    imageUrl: string;
    champions: string[];
  }) {
    try {
      const existingRegion = await this.regionRepository.findOne({
        where: { name: regionData.name },
      });

      if (existingRegion) {
        console.log(`Mise à jour de la région : ${regionData.name}`);
        await this.regionRepository.update(
          { id: existingRegion.id },
          regionData,
        );
        return { ...existingRegion, ...regionData };
      } else {
        console.log(`Création de la région : ${regionData.name}`);
        return await this.regionRepository.save(regionData);
      }
    } catch (error) {
      console.error(`Erreur lors de l'ajout/mise à jour de la région:`, error);
      throw error;
    }
  }
}
