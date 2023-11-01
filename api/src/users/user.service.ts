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
  object_appointment,
} from 'src/Global/object_global';
import { validate } from 'src/Global/functions/validation';
import { Client } from './models/client.entity';
import { CommonService } from '../common/common.service';
import { Lawyer } from './models/lawyer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { compare, encrypt } from 'src/Global/functions/encryption';
import { send, sendappointment } from 'src/Global/functions/nodeMaile';
import { generateToken } from 'src/Global/functions/AuthMiddleware';
import { type } from './models/type.entity';
import { modality } from './models/modality.entity';
import { typeAppointment } from './models/appointment_type';
import { appointmentCreate } from './class/appointment.dto';
import { Appointment } from './models/appointment.entity';
import {
  descriptionClient,
  descriptionlaweys,
} from 'src/Global/constant/variable';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(type) private tipoModalidad: Repository<type>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Lawyer) private laweyRepository: Repository<Lawyer>,
    @InjectRepository(typeAppointment)
    private appointmentTypeRepository: Repository<typeAppointment>,
    @InjectRepository(modality)
    private modalityRepository: Repository<modality>,
    private cloudinary: CommonService,
    private rolService: RolService,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
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
        if (post.type && post.modality) {
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
          if (!post.price) {
            return new HttpException('enter the price', HttpStatus.NOT_FOUND);
          }

          // if (!post.description) {
          //   return new HttpException(
          //     'enter the descriptions',
          //     HttpStatus.NOT_FOUND,
          //   );
          // }
          // lawey.description = post.description;
          lawey.price = post.price;
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
            }
            existingLawey.price = update.price;
            existingLawey.description = update.description;

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
            return true;
          } else {
            return false;
          }
        } else {
          const { id, isActive } = userSearch.lawyer[0];
          if (!isActive) {
            await this.laweyRepository.update({ id }, { isActive: true });
            return true;
          } else {
            return false;
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

  async get_load_status_appointment() {
    const appointment_type = ['Accepted', 'Rejected', 'Pending'];
    const result = await this.appointmentTypeRepository.find({
      where: {
        name: In(appointment_type),
      },
    });
    if (result.length > 0) {
      return new HttpException(
        'appointment type are already added',
        HttpStatus.NOT_FOUND,
      );
    }
    const appointment = appointment_type.map((name) =>
      this.modalityRepository.create({ name }),
    );

    await this.appointmentTypeRepository.save(appointment);
    return 'status added correctly';
  }
  async get_load_status_appointment_filter() {
    return await this.appointmentTypeRepository.find();
  }

  async get_appointment_create(appointment_create: appointmentCreate) {
    const appointmentType = await this.appointmentTypeRepository.findOne({
      where: {
        name: 'Pending',
      },
    });
    if (!appointmentType) {
      return new HttpException(
        'Type appointment is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    appointment_create.statusId = appointmentType.id;
    const dates = new Date(appointment_create.birthdate);
    const appointment_object = object_appointment(appointment_create, dates);

    const appointment = this.appointmentRepository.create(appointment_object);
    await this.appointmentRepository.save(appointment);
    return 'Appointment created successfully';
  }

  async get_cargar_type_appointment_filter_user(idRol: string, idUser: string) {
    const rol = await this.rolService.get_rol_id(idRol);
    if (!rol) {
      throw new HttpException('role not found', HttpStatus.NOT_FOUND);
    }

    if (rol.name == 'cliente' || rol.name == 'Cliente') {
      const options: FindManyOptions<Appointment> = {
        relations: {
          client: true,
          lawyer: true,
          status: true,
          modality: true,
        },
        where: [{ client: { id: idUser } }],
      };
      const result = await this.appointmentRepository.find(options);
      return result;
    } else {
      const options: FindManyOptions<Appointment> = {
        relations: {
          client: true,
          lawyer: true,
          status: true,
          modality: true,
        },
        where: [{ lawyer: { id: idUser } }],
      };
      const result = await this.appointmentRepository.find(options);
      return result;
    }
  }

  async get_cargar_type_appointment_update_accepted(
    idRol: string,
    idAppointment: string,
    links: string,
  ) {
    const rol = await this.rolService.get_rol_id(idRol);
    if (!rol) {
      throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
    }

    if (rol.name.toLowerCase() === 'abogado') {
      const appointmentType = await this.appointmentTypeRepository.findOne({
        where: { name: 'Accepted' },
      });
      const options: FindManyOptions<Appointment> = {
        relations: [
          'client',
          'lawyer',
          'status',
          'modality',
          'client.user',
          'lawyer.user',
        ],
        where: [{ id: idAppointment }],
      };

      if (links && idAppointment) {
        const appointment = await this.appointmentRepository.findOne(options);

        if (appointment.status.name == 'Accepted') {
          throw new HttpException(
            'Error accepting appointment: appointment has already been accepted',
            HttpStatus.NOT_FOUND,
          );
        }
        if (appointment.status.name == 'Rejected') {
          throw new HttpException(
            'Failed to accept appointment: Cannot accept an appointment that was rejected',
            HttpStatus.NOT_FOUND,
          );
        }
        appointment.status = appointmentType;
        appointment.link = links;
        await this.appointmentRepository.save(appointment);
        const descriptionsClients = descriptionClient(
          appointment.lawyer.user.name,
          appointment.client.user.name,
          appointment.fecha,
          appointment.time,
        );

        const descriptionslaweyers = descriptionlaweys(
          appointment.lawyer.user.name,
          appointment.client.user.name,
          appointment.fecha,
          appointment.time,
        );
        await sendappointment(
          appointment.client.user.email,
          descriptionsClients,
          appointment.link,
        );
        await sendappointment(
          appointment.lawyer.user.email,
          descriptionslaweyers,
          appointment.link,
        );
        return 'appointment accepted';
      } else {
        throw new HttpException('Enter the meeting link', HttpStatus.NOT_FOUND);
      }
    }
  }

  async get_cargar_type_appointment_update_refused(
    idRol: string,
    idAppointment: string,
  ) {
    const rol = await this.rolService.get_rol_id(idRol);
    if (!rol) {
      throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
    }

    if (rol.name.toLowerCase() === 'abogado') {
      const appointmentType = await this.appointmentTypeRepository.findOne({
        where: { name: 'Rejected' },
      });
      const options: FindManyOptions<Appointment> = {
        relations: [
          'client',
          'lawyer',
          'status',
          'modality',
          'client.user',
          'lawyer.user',
        ],
        where: [{ id: idAppointment }],
      };
      const appointment = await this.appointmentRepository.findOne(options);
      appointment.status = appointmentType;
      await this.appointmentRepository.save(appointment);
      return 'appointment rejected';
    }
  }
}
