import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {MedicionesService} from './mediciones.service.js';

@UseGuards(AuthGuard('jwt'))
@Controller('mediciones')
export class MedicionesController {
  constructor(private readonly medicionesService: MedicionesService){}
  @Post('registrar-glucosa')
  async registrarGlucosa(@Body() body:{glucosa:number, seleccionado:string, id_usuario:number}){
    return await this.medicionesService.RegistrarGlucosa(body.glucosa, body.seleccionado, body.id_usuario);
  }
}
