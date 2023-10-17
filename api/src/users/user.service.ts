import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUser, updateUser } from './class/user.dto';
import { RolService } from 'src/rol/rol.service';
import { User } from './models/user.entity';
import {
  object_user,
  object_client,
  object_lawey,
  object_user_validation,
} from 'src/Global/object_global';
import { validate } from 'src/Global/functions/validation';
import { Client } from './models/client.entity';
import { CommonService } from '../common/common.service';
import { Lawyer } from './models/lawyer.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Lawyer) private laweyRepository: Repository<Lawyer>,
    private cloudinary: CommonService,
    private rolService: RolService,
  ) {}
  async get_users() {
    try {
      const user = await this.userRepository.find({
        relations: ['rolId'],
      });
      if (!user) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async get_user(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
        relations: ['rolId'],
      });
      if (!user) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async create_user(post: createUser, file: any) {
    try {
      const rol = await this.rolService.get_rol_id(post.rolId);
      if (!rol) {
        throw new HttpException('role not found', HttpStatus.NOT_FOUND);
      }
      const object_validation = object_user_validation(post);
      const data_validate = await validate(
        this.userRepository,
        object_validation,
      );

      if (data_validate.length > 0) {
        return new HttpException(data_validate, HttpStatus.ACCEPTED);
      }
      const user = object_user(post);
      const news_User = this.userRepository.create(user);
      const data = await this.userRepository.save(news_User);
      const image = await this.cloudinary.uploadImage(file);
      if (rol.name == 'cliente' || rol.name == 'Cliente') {
        const object_data_add = object_client(data);
        object_data_add.imagen = image.url;
        const cliente = this.clientRepository.create(object_data_add);
        this.clientRepository.save(cliente);
        return 'Client created successfully';
      } else {
        const object_data_add = object_lawey(data);
        object_data_add.imagen = image.url;
        const lawey = this.laweyRepository.create(object_data_add);
        this.laweyRepository.save(lawey);
        return 'Lawey created successfully';
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update_user(
    id: string,
    update: updateUser,
    idCliente: string,
    file: any,
  ) {
    const rol = await this.rolService.get_rol_id(update.rolId);
    if (!rol) {
      throw new HttpException('role not found', HttpStatus.NOT_FOUND);
    }
    console.log('hola');
  }
}
