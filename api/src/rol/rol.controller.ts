import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRol, UpdateRol } from './class/rol';

@Controller('rol')
export class RolController {
  constructor(private rolService: RolService) {}
  @Get()
  getRol() {
    return this.rolService.getRol();
  }

  @Post()
  CreateRol(@Body() rol: CreateRol) {
    return this.rolService.createRol(rol);
  }
  @Patch(':id')
  UpdateRol(@Param('id') id: string, @Body() rol: UpdateRol) {
    return this.rolService.updateRol(id, rol);
  }
}
