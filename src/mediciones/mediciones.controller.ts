import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {MedicionesService} from './mediciones.service.js';

@UseGuards(AuthGuard('jwt'))
@Controller('mediciones')
export class MedicionesController {
  constructor(private readonly medicionesService: MedicionesService){}
  @Post('registrar-glucosa')

  async registrarGlucosa(@Body() body:{tipo:string,glucosa:number, seleccionado:string, id_usuario:number}, @Req() req:any){
    const id_usuario = req.user?.id_usuario;
    return await this.medicionesService.RegistrarGlucosa(body.glucosa, body.seleccionado, id_usuario);
  }

  @Post('registrar-presion')
  async registrarPresion(@Body() body:{ sistolica:number, diastolica:number, seleccionado:string, id_usuario:number}, @Req() req:any){
    const id_usuario = req.user?.id_usuario;
    return await this.medicionesService.RegistrarPresion(body.sistolica, body.diastolica, body.seleccionado, id_usuario);
  }
}
