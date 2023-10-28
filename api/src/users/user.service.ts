import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createUser, updateUser, loginData } from './class/user.dto';
import { RolService } from 'src/rol/rol.service';
import { User } from './models/user.entity';
import {
  object_user,
  object_client,
  object_lawey,
  object_user_validation,
  object_update_user,
  search_user_email,
} from 'src/Global/object_global';
import { validate } from 'src/Global/functions/validation';
import { Client } from './models/client.entity';
import { CommonService } from '../common/common.service';
import { Lawyer } from './models/lawyer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { encrypt, compare } from 'src/Global/functions/encryption';
import { send } from 'src/Global/functions/nodeMaile';
import { generateToken } from 'src/Global/functions/AuthMiddleware';
import { type } from './models/type.entity';
import { modality } from './models/modality.entity';
// import { activate } from './class/activate.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(type) private tipoModalidad: Repository<type>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Lawyer) private laweyRepository: Repository<Lawyer>,
    @InjectRepository(modality)
    private modalityRepository: Repository<modality>,
    private cloudinary: CommonService,
    private rolService: RolService,
  ) {}
  async get_users(modality: string, name: string) {
    try {
      const users = await this.userRepository.find({
        relations: ['rolId', 'lawyer', 'lawyer.modality', 'lawyer.type'],
      });

      if (!users) {
        return new HttpException('Users not found', HttpStatus.NOT_FOUND);
      }
      let filteredUsers: any[];

      if (!modality && !name) {
        filteredUsers = users.filter((user) => user.lawyer.length > 0);
        return filteredUsers;
      }
      if (modality && !name) {
        filteredUsers = users.filter((user) =>
          user.lawyer.some((lawyer) =>
            lawyer.modality.some((mod) => mod.name === modality),
          ),
        );
        console.log(filteredUsers);
        return filteredUsers;
      }

      if (!modality && name) {
        filteredUsers = users.filter((user) =>
          user.lawyer.some(
            (lawyer) =>
              lawyer.type.some((userType) => userType.name === name) ||
              user.name === name,
          ),
        );
        return filteredUsers;
      }

      if (modality && name) {
        const filteredUsers = users.filter((user) =>
          user.lawyer.some(
            (lawyer) =>
              (lawyer.modality.some((mod) => mod.name === modality) &&
                lawyer.type.some((userType) => userType.name === name)) ||
              user.name === name,
          ),
        );

        return filteredUsers;
      }

      return users;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async get_users_login(ingreso: loginData) {
    try {
      const user = await search_user_email(ingreso.email, this.userRepository);
      if (user) {
        const password_decrypted = await compare(user.pass, ingreso.password);
        if (password_decrypted) {
          const token = await generateToken({ user });
          return { token };
        } else {
          return new HttpException('Password Incorrect', HttpStatus.NOT_FOUND);
        }
      } else {
        return new HttpException('Wrong Email', HttpStatus.NOT_FOUND);
      }
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
        relations: [
          'rolId',
          'client',
          'lawyer',
          'lawyer.modality',
          'lawyer.type',
        ],
      });
      if (!user) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async get_user_profile(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
        relations: [
          'rolId',
          'client',
          'lawyer',
          'lawyer.modality',
          'lawyer.type',
        ],
      });
      if (!user) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (user.client.length > 0) {
        delete user.lawyer;
      } else {
        delete user.client;
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
      const password_encrypt = await encrypt(user.pass);
      user.pass = password_encrypt;
      const news_User = this.userRepository.create(user);
      const data = await this.userRepository.save(news_User);
      let image: any;
      if (rol.name == 'cliente' || rol.name == 'Cliente') {
        const object_data_add = object_client(data);
        if (file) {
          image = await this.cloudinary.uploadImage(file);
          object_data_add.imagen = image.url;
        }
        const cliente = this.clientRepository.create(object_data_add);
        this.clientRepository.save(cliente);
        await send(data.email);
        const combinedObject = { ...news_User, ...cliente };
        const token = await generateToken(combinedObject);
        return { token };
      } else {
        const object_data_add = object_lawey(data);
        if (file) {
          image = await this.cloudinary.uploadImage(file);
          object_data_add.imagen = image.url;
        }
        if (post.type && post.type) {
          const lawey = this.laweyRepository.create(object_data_add);
          const finder = await this.modalityRepository.find({
            where: {
              id: post.modality,
            },
          });

          const finder_type = await this.tipoModalidad.find({
            where: {
              id: post.type,
            },
          });
          if (!finder_type && !finder)
            return new HttpException(
              'Enter the type of modality and specialization.',
              HttpStatus.NOT_FOUND,
            );
          lawey.modality = finder;
          lawey.type = finder_type;
          this.laweyRepository.save(lawey);
          await send(data.email);
          const combinedObject = { ...news_User, ...lawey };
          const token = await generateToken(combinedObject);
          return { token };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update_user(id: string, update: updateUser, file: any) {
    try {
      const rol = await this.rolService.get_rol_id(update.rolId);
      if (!rol) {
        throw new HttpException('role not found', HttpStatus.NOT_FOUND);
      }
      const object_validation = object_user_validation(update);
      const data_validate = await validate(
        this.userRepository,
        object_validation,
      );

      if (data_validate.length > 0) {
        return new HttpException(data_validate, HttpStatus.ACCEPTED);
      }
      const user_update_data = object_update_user(update);
      const data = await this.userRepository.update({ id }, user_update_data);
      if (data.affected) {
        if (rol.name == 'cliente' || rol.name == 'Cliente') {
          if (file) {
            const existingClient = await this.clientRepository.findOne({
              where: { user: { id } },
            });
            if (existingClient) {
              const image = await this.cloudinary.uploadImage(file);
              existingClient.imagen = image.url;
              this.clientRepository.save(existingClient);
            }
          }
        } else {
          const existingLawey = await this.laweyRepository.findOne({
            where: { user: { id } },
          });
          if (existingLawey) {
            if (file) {
              const image = await this.cloudinary.uploadImage(file);
              existingLawey.imagen = image.url;
            } else {
              existingLawey.price = update.price;
              existingLawey.description = update.description;
            }
            await this.laweyRepository.save(existingLawey);
          }
        }
        return 'account updated successfully';
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async get_user_activate(correo: string) {
    try {
      if (correo) {
        const userSearch = await this.userRepository.findOne({
          where: {
            email: correo,
          },
          relations: {
            rolId: true,
            lawyer: true,
            client: true,
          },
        });
        if (!userSearch) {
          return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        if (
          userSearch.rolId.name === 'cliente' ||
          userSearch.rolId.name === 'Cliente'
        ) {
          const { id, isActive } = userSearch.client[0];
          if (!isActive) {
            await this.clientRepository.update({ id }, { isActive: true });
          } else {
            return new HttpException(
              'La cuenta ya se encuentra activada',
              HttpStatus.NOT_FOUND,
            );
          }
        } else {
          const { id, isActive } = userSearch.lawyer[0];
          if (!isActive) {
            await this.laweyRepository.update({ id }, { isActive: true });
          } else {
            return new HttpException(
              'La cuenta ya se encuentra activada',
              HttpStatus.NOT_FOUND,
            );
          }
        }
      } else {
        return new HttpException('Email required', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async get_cargar_type() {
    try {
      const specializations = [
        'derecho civil',
        'derecho penal',
        'derecho laboral',
        'derecho comercial',
        'derecho de familia',
        'derecho inmobiliario',
        'Otros',
      ];
      const result = await this.tipoModalidad.find({
        where: {
          name: In(specializations),
        },
      });
      if (result.length > 0) {
        return new HttpException(
          'specialties are already added',
          HttpStatus.NOT_FOUND,
        );
      }
      const especializaciones = specializations.map((name) =>
        this.tipoModalidad.create({ name }),
      );
      await this.tipoModalidad.save(especializaciones);
      return 'Specialties added correctly';
    } catch (error) {
      console.log(error);
    }
  }
  async get_filtrar_type() {
    return await this.tipoModalidad.find();
  }

  async get_cargar_type_modality() {
    try {
      const modality = ['remote', 'onsite'];
      const result = await this.modalityRepository.find({
        where: {
          name: In(modality),
        },
      });
      if (result.length > 0) {
        return new HttpException(
          'modality are already added',
          HttpStatus.NOT_FOUND,
        );
      }
      const especializaciones = modality.map((name) =>
        this.modalityRepository.create({ name }),
      );
      await this.modalityRepository.save(especializaciones);
      return 'modality added correctly';
    } catch (error) {
      console.log(error);
    }
  }
  async get_filtrar_type_modality() {
    return await this.modalityRepository.find();
  }
}
