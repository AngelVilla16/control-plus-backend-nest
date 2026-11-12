import { Injectable, Inject, UnauthorizedException, BadRequestException } from '@nestjs/common';
import {Pool} from 'pg';

@Injectable()
export class MedicionesService {
  constructor(@Inject('DB_POOL') private readonly pool:Pool){}

  //Logica para registrar glucosa
  async RegistrarGlucosa(glucosa:number, seleccionado:string, id_usuario:number){
    if(!glucosa || !seleccionado){
      throw new BadRequestException('Todos los campos son obligatorios');
    }
    const tipo:string = 'Glucosa';
    const query = await this.pool.query('INSERT INTO mediciones(tipo,glucosa, momento, id_usuario) VALUES($1, $2, $3, $4)',[tipo,glucosa, seleccionado, id_usuario]);
    return {mensaje:' Nivel de glucosa registrado correctamente!'}
  }

  //Logica para registrar presión
  async RegistrarPresion( sistolica:number, diastolica:number, seleccionado:string, id_usuario:number){
    const tipo:string = 'Presion';
    const query = await this.pool.query('INSERT INTO mediciones(tipo, sistolica, diastolica,momento, id_usuario) VALUES($1, $2, $3, $4, $5)',[tipo, sistolica, diastolica, seleccionado, id_usuario]);
    return {mensaje:'Nivel de  presión registrado correctamente!'}
  }
}
