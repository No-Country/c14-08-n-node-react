import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './models/rol.entity';
import { Repository } from 'typeorm';
import { CreateRol, UpdateRol } from './class/rol';
@Injectable()
export class RolService {
  constructor(@InjectRepository(Rol) private rolRepository: Repository<Rol>) {}
  getRol() {
    return this.rolRepository.find();
  }

  async createRol(rol: CreateRol) {
    const userFound = await this.rolRepository.findOne({
      where: {
        name: rol.name,
      },
    });

    if (userFound !== null) {
      return {
        message: new HttpException('User already exists', HttpStatus.CONFLICT),
      };
    }
    const newsRol = this.rolRepository.create(rol);
    return this.rolRepository.save(newsRol);
  }
  async updateRol(id: string, rol: UpdateRol) {
    const userFound = await this.rolRepository.findOne({
      where: {
        id,
      },
    });
    if (!userFound) {
      return {
        message: new HttpException('User not found', HttpStatus.CONFLICT),
      };
    }
    return this.rolRepository.update({ id }, rol);
  }
}
