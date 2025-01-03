import { Controller, Get, Post, Body } from '@nestjs/common';
import { RegionService } from './region.service';

@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  async getAllRegions() {
    return this.regionService.findAll();
  }

  @Post()
  async addRegion(
    @Body()
    regionData: {
      name: string;
      description: string;
      imageUrl: string;
      champions: string[];
    },
  ) {
    return this.regionService.addRegion(regionData);
  }

  @Post('reinitialize')
  async reinitializeRegions() {
    return this.regionService.reinitializeRegions();
  }
}
