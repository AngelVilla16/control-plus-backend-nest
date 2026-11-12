import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import{JwtStrategy} from './auth/jwt.strategy/jwt.strategy.js';
import {JwtModule} from '@nestjs/jwt';
import { createObserveModule } from '@nestjs/observe';
import {Pool} from 'pg';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AuthController } from './auth/auth.controller.js';
import { AuthService } from './auth/auth.service.js';
import { MedicionesController } from './mediciones/mediciones.controller.js';
import { MedicionesService } from './mediciones/mediciones.service.js';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      //Carga el env de forma global
      isGlobal:true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: '1h'},
      })
    }),
    
  ],
  controllers: [AuthController, MedicionesController],
  //Configuracion del pool de conexiones desde el provedor 'provider'
  providers: [ AuthService,JwtStrategy,{
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
  }, MedicionesService],
})
export class AppModule {}
