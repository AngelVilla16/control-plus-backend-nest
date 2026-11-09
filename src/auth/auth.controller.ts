import { Controller, Post, Body } from '@nestjs/common';
import {AuthService} from './auth.service.js';

@Controller('auth') //Define la ruta: http://localhost:3000/auth
export class AuthController {
  //Inyectar el servicio de Auth
  constructor(private readonly authService: AuthService){}

  //Ruta POST auth/login
  @Post('login')
  async login(@Body() body:{correo:string; contrasena:string}){
    //Llamar al metodo del servicio y enviar los datos del body
    return await this.authService.login(body.correo, body.contrasena);
  }
}
