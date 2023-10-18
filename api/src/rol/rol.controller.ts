import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  HttpException,
} from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRol, UpdateRol } from './class/rol';
import { Rol } from './models/rol.entity';

@Controller('rol')
export class RolController {
  constructor(private rolService: RolService) {}
  @Get()
  get_rol() {
    return this.rolService.get_rol();
  }
  @Get(':id')
  get_rol_id(@Param('id') id: string): Promise<Rol> {
    return this.rolService.get_rol_id(id);
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
