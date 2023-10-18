import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  Param,
  UseInterceptors,
  UploadedFile,
  Patch,
} from '@nestjs/common';
import { UsuarioService } from './user.service';
import { createUser, updateUser } from './class/user.dto';
import { User } from './models/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('users')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createUsuario(
    @Body() usuario: createUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usuarioService.create_user(usuario, file);
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

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update_user(
    @Param('id') id: string,
    @Body() usuario: updateUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usuarioService.update_user(id, usuario, file);
  }
}
