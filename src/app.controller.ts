import {Controller, Get, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {HealthGuard} from "./HealthGuard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(HealthGuard)
  @Get('health')
  getHealthTensorflowServing(){
    return this.appService.getTensorflowHealth()
  }
}
