import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {MedicionesService} from './mediciones.service.js';

@UseGuards(AuthGuard('jwt'))
@Controller('mediciones')
export class MedicionesController {
  constructor(private readonly medicionesService: MedicionesService){}
  @Post('registrar-glucosa')

  async registrarGlucosa(@Body() body:{tipo:string,glucosa:number, seleccionado:string, id_usuario:number}, @Req() req:any){
    const id_usuario = req.usuario?.id_usuario;
    return await this.medicionesService.RegistrarGlucosa(body.tipo,body.glucosa, body.seleccionado, id_usuario);
  }
}
