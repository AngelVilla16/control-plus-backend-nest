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
        
        const  filas = result.rows;
        if(!filas.length){
            throw new UnauthorizedException('Usuario o Contraseña incorrectos.');
        }

        const usuario = filas[0];

        const ok = await bcrypt.compare(contrasena, usuario.contrassena);
        if(!ok){
            throw new UnauthorizedException('Usuario o Contraseña incorrectos');

        }
        //Generar el token de JWT
        const token = this.jwt.sign({id_usuario: usuario.id_usuario}, {expiresIn: '7d'});
        return{
            mensaje:'Inicio de sesión exitoso',
            nombre: usuario.nombre,
            correo: usuario.correo,
            id_usuario: usuario.id_usuario,
            perfil_completo: usuario.perfil_completo,
            token
        };
    }
}
