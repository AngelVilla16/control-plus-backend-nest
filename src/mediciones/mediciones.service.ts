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
  //obtener las mediciones recientes de glucosa
  async getGlucosaReciente(id_usuario:number){
    const {rows}= await this.pool.query(
      'SELECT glucosa, momento, fecha FROM mediciones WHERE id_usuario= $1 ORDER BY fecha DESC LIMIT 10', [id_usuario]
    ); 
    
    const filas = rows[0];
    if(filas.length === 0){
      throw new UnauthorizedException('No se encontraron registros de glucosa para este usuario');
    }
    
    return rows;
  }
  //Obtener las mediciones recientes de presion 
  async getPresionReciente(id_usuario:number){
    const {rows} = await this.pool.query('SELECT sistolica, diastolica, momento, fecha FROM mediciones WHERE id_usuario = $1 ORDER BY fecha DESC LIMIT 10', [id_usuario]);

    const filas = rows[0];
    if(filas.length === 0){
      throw new UnauthorizedException('No se encontraron registros de presion');
    }
    return rows;
  }
}
