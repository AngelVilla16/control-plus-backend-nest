import { Controller, Patch, UseGuards, Body, Req } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ProfileService} from './profile.service.js';
@UseGuards(AuthGuard('jwt'))
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService){}

  @Patch('actualizar-perfil')
  async actualizarPerfil(@Body() body:{edad:number, peso:number, altura:number, id_usuario:number}, @Req() req:any){
    const id_usuario = req.user.id_usuario;
    return await this.profileService.actualizarPerfil(body.edad, body.peso, body.altura, id_usuario);
  }
}
