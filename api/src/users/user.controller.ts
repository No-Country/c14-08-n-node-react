import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  Param,
} from '@nestjs/common';
import { UsuarioService } from './user.service';
import { createUser } from './class/user';
import { User } from './models/user.entity';
@Controller('users')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}
  @Post()
  createUsuario(@Body() usuario: createUser) {
    return this.usuarioService.create_user(usuario);
  }
  @Get()
  async get_users() {
    const data = await this.usuarioService.get_users();
    const user = data;
    return user;
  }

  @Get(':id')
  async get_user(@Param('id') id: string): Promise<User | HttpException> {
    const data = await this.usuarioService.get_user(id);
    return data;
  }
}
