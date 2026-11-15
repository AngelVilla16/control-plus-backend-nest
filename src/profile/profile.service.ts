import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Pool} from 'pg';
@Injectable()
export class ProfileService {
  constructor(
    @Inject('DB_POOL') private pool:Pool,
    private jwt:JwtService
  ){}
  //Logica de actualizar el perfil por primera vez
  async actualizarPerfil(edad:number, peso:number, altura:number, id_usuario:number){
    if(!edad || !peso || !altura){
      throw new BadRequestException(('Todos los campos son obligatorios.'));
    }
    const check = true;
    const query = await this.pool.query('UPDATE usuarios SET edad = $1, peso =$2, altura=$3, perfil_completo= $4 WHERE id_usuario = $5',[edad, peso, altura, check, id_usuario]);
    return {mensaje:'Perfil actualizado correctamente.'};
  }
  //funcion para traer los datos del perfil
  async datosPerfil(id_usuario: number){

    const query = await this.pool.query('SELECT correo, edad, peso, altura FROM usuarios WHERE id_usuario = $1', [id_usuario]);
    const filas = query.rows;
    const usuario = filas[0];
    return {correo:usuario.correo, edad: usuario.edad, peso: usuario.peso, altura: usuario.altura};
  }

}
