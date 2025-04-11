import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AppService {

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService) {
  }

  async getTensorflowHealth(){
    try{
      const {data} = await firstValueFrom(
          this.httpService.get(
              this.configService.get<string>('TENSORFLOW_SERVING_URL'),
              {
                timeout: 5000,
              }
          )
      )
      return data;
    }
    catch(error){
      throw new InternalServerErrorException(error) ;
    }

  }
}
