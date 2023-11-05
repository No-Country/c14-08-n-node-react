import { User } from 'src/users/models/user.entity';
import { Client } from 'src/users/models/client.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Lawyer } from 'src/users/models/lawyer.entity';
import { appointmentCreate } from 'src/users/class/appointment.dto';
import { Appointment } from 'src/users/models/appointment.entity';

export const object_user = (post: any) => {
  const user: DeepPartial<User> = {
    id: post.id,
    name: post.name,
    lastName: post.lastName,
    Phone: post.Phone,
    birthdate: post.birthdate,
    email: post.email,
    pass: post.password,
    rolId: { id: post.rolId },
  };
  return user;
};

export const object_client = (post: object) => {
  const client: DeepPartial<Client> = {
    user: post,
  };
  return client;
};

export const object_lawey = (post: object) => {
  const lawey: DeepPartial<Lawyer> = {
    user: post,
  };
  return lawey;
};

export const object_update_user = (update: any) => {
  const object_actu = {};
  for (const key in update) {
    if (update[key] !== undefined) {
      if (key === 'rolId') {
        object_actu[key] = { id: update[key] };
      } else {
        if (key !== 'price' && key !== 'description')
          object_actu[key] = update[key];
      }
    }
  }
  return object_actu;
};

export const object_update_user_lawyer = (update: any) => {
  const object_actu = {};
  for (const key in update) {
    if (update[key] !== undefined) {
      if (key !== 'price' && key !== 'description') {
        object_actu[key] = update[key];
      }
    }
  }
  return object_actu;
};

export function object_user_validation(post: any) {
  if (post.phone && post.email) {
    return {
      Phone: post.phone,
      email: post.email,
    };
  } else {
    if (!post.phone && post.email) {
      return {
        email: post.email,
      };
    } else {
      if (post.phone && !post.email) {
        return {
          Phone: post.phone,
        };
      }
    }
  }
}

export const search_user_email = async (
  email: string,
  modelo: Repository<User>,
) => {
  return await modelo.findOne({
    where: { email: email },
    relations: {
      rolId: true,
      lawyer: true,
      client: true,
    },
  });
};

export const object_appointment = (
  appointment_create: appointmentCreate,
  date: Date,
) => {
  const appointmentData: DeepPartial<Appointment> = {
    fecha: date,
    client: { id: appointment_create.idClient },
    lawyer: { id: appointment_create.idLawyers },
    status: { id: appointment_create.statusId },
    modality: { id: appointment_create.modalityId },
    link: appointment_create.links,
    time: appointment_create.hour,
  };

  return appointmentData;
};
