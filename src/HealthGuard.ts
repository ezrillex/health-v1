import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class HealthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const secret = request.headers['x-health-secret'];

    if (secret !== this.configService.get<string>('SECRET')) {
      throw new UnauthorizedException('Invalid health check secret');
    }

    return true;
  }
}
