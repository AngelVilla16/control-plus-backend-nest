import { Injectable, Inject, UnauthorizedException, BadRequestException } from '@nestjs/common';
import {Pool} from 'pg';

@Injectable()
export class MedicionesService {
  constructor(@Inject('DB_POOL') private readonly pool:Pool){}

  //Logica para registrar glucosa
  async RegistrarGlucosa(glucosa:number, seleccionado:string, id_usuario:number){

    if(!glucosa || !seleccionado || !id_usuario){
      throw new BadRequestException('Todos los campos son obligatorios!');
    }
    const query = await this.pool.query('INSERT INTO mediciones(glucosa, momento, id_usuario) VALUES($1, $2, $3)',[glucosa, seleccionado, id_usuario]);
    return {mensaje:' Nivel de glucosa registrado correctamente!'}
  }
}
