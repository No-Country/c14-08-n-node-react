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
  Query,
  Req,
} from '@nestjs/common';
import { UsuarioService } from './user.service';
import { createUser, loginData, updateUser } from './class/user.dto';
import { User } from './models/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { modality } from './models/modality.entity';

@Controller('users')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  createUsuario(
    @Body() usuario: createUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usuarioService.create_user(usuario, file);
  }
  @Post('login')
  get_users_login(@Body() usuario: loginData) {
    return this.usuarioService.get_users_login(usuario);
  }

  @Get('filtrar')
  async get_users(
    @Query('modality') modality: string,
    @Query('name') name: string,
  ) {
    const data = await this.usuarioService.get_users(modality, name);
    const user = data;
    return user;
  }

  @Get(':id')
  async get_user(@Param('id') id: string): Promise<User | HttpException> {
    const data = await this.usuarioService.get_user(id);
    return data;
  }

  @Get('public/perfil')
  async get_public_profile(@Req() req: Request) {
    const data = await this.usuarioService.get_user_profile(req['user'].id);
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

  @Get('account/activate')
  async get_use(@Query('email') email: string) {
    return this.usuarioService.get_user_activate(email);
  }

  @Get('load/types')
  async get_cargar_type() {
    return this.usuarioService.get_cargar_type();
  }

  @Get('loading/type')
  async get_filtrar_type() {
    return this.usuarioService.get_filtrar_type();
  }

  @Get('loading/type/modality')
  async get_cargar_type_modality() {
    return this.usuarioService.get_cargar_type_modality();
  }

  @Get('loading/type/filter/modality')
  async get_filtrar_type_modality() {
    return this.usuarioService.get_filtrar_type_modality();
  }
}
