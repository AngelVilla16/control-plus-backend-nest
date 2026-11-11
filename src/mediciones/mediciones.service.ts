import { Injectable, Inject, UnauthorizedException, BadRequestException } from '@nestjs/common';
import {Pool} from 'pg';

@Injectable()
export class MedicionesService {
  constructor(@Inject('DB_POOL') private readonly pool:Pool){}

  //Logica para registrar glucosa
  async RegistrarGlucosa(tipo:string,glucosa:number, seleccionado:string, id_usuario:number){




    const query = await this.pool.query('INSERT INTO mediciones(tipo,glucosa, momento, id_usuario) VALUES($1, $2, $3, $4)',[tipo,glucosa, seleccionado, id_usuario]);
    return {mensaje:' Nivel de glucosa registrado correctamente!'}
  }
}
