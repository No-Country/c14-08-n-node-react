import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { createUser } from './class/usuario';
import { RolService } from 'src/rol/rol.service';
import { User } from './models/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private rolService: RolService,
  ) {}
  async get_users() {
    const user = await this.userRepository.find({
      relations: ['rol_user'],
    });
    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async get_user(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['rol_user'],
    });
    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  create_user(post: createUser) {
    const rol = this.rolService.get_rol_id(post.IdRol);
    if (!rol) {
      throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
    }
    const newsUser = this.userRepository.create(post);
    return this.userRepository.save(newsUser);
  }
}
