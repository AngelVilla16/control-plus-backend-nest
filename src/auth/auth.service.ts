import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {Pool} from 'pg';

@Injectable()
export class AuthService {
    constructor(
        @Inject('DB_POOL') private pool:Pool, //Injecta el pool de conexion a la BD que se crea en app.module
        private jwt: JwtService
    ){}

    //Aqui se inserta la logica 
    async login(correo:string, contrasena:string){
        //Ejecutar consulta en postgre
        //En postgre se usa $1 en vez de ? para parametrizar las consultas
        const result = await this.pool.query('SELECT id_usuario, correo, contrasena, perfil_completo FROM usuarios WHERE correo = $1', [correo]);
    }
}
