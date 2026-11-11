import {
  Injectable,
  Inject,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
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
        const result = await this.pool.query('SELECT id_usuario, nombre, correo, contrasena, edad, peso, altura, perfil_completo FROM public.usuarios WHERE correo = $1', [correo]);
        
        const  filas = result.rows;
        if(!filas.length){
            throw new UnauthorizedException('Usuario o Contraseña incorrectos.');
        }

        const usuario = filas[0];

        const ok = await bcrypt.compare(contrasena, usuario.contrasena);
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
            edad: usuario.edad,
            peso: usuario.peso,
            altura: usuario.altura,
            perfil_completo: usuario.perfil_completo,
            token
        };
    }
    async register(nombre:string, correo:string, contrasena:string){

        if(!nombre || !correo || !contrasena){
            throw new BadRequestException('Todos los campos son requeridos.');
        }
        if(contrasena.length < 8){
            throw new BadRequestException('La contraseña debe tener un minimo de 8 caracteres');
        }
        const validar = await this.pool.query('SELECT correo FROM public.usuarios WHERE correo = $1', [correo]);
        const filasvalidar  = validar.rows;

        if(filasvalidar.length>0){
            throw new  BadRequestException('Este correo ya esta en uso.');
        }
        //Encriptar contraseña
        const hash = await bcrypt.hash(contrasena,10);

        //Registrar usuario
        const query = await this.pool.query(
          'INSERT INTO public.usuarios(nombre, correo, contrasena) VALUES($1, $2, $3) RETURNING id_usuario, nombre, correo',
          [nombre, correo, hash],
        );
        const result = query.rows[0];
        return {
            mensaje:'Usuario registrado con exito',
            usuario: result
        }
    }
}
