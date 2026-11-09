import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import {Pool} from 'pg';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AuthController } from './auth/auth.controller.js';
import { AuthService } from './auth/auth.service.js';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      //Carga el env de forma global
      isGlobal:true,
    }),
    
  ],
  controllers: [AuthController],
  //Configuracion del pool de conexiones desde el provedor 'provider'
  providers: [ AuthService,{
    provide:'DB_POOL',
    inject:[ConfigService],
    useFactory:(configService: ConfigService)=>{
      //Esto retorna un objeto pool
      return new Pool({
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT') || 5432,
        user: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
      });
    },
  }],
})
export class AppModule {}
