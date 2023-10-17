import { User } from 'src/users/models/user.entity';
import { Client } from 'src/users/models/client.entity';
import { DeepPartial } from 'typeorm';
import { Lawyer } from 'src/users/models/lawyer.entity';

// Create an object that meets DeepPartial<User>
export const object_user = (post: any) => {
  const user: DeepPartial<User> = {
    id: post.id,
    name: post.name,
    last_Name: post.last_Name,
    Phone: post.phone,
    birthdate: post.birthdate,
    email: post.email,
    pass: post.pass,
    rolId: { id: post.rolId }, // Make sure roleId is a DeepPartial<Role> object
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
  const client: DeepPartial<Lawyer> = {
    user: post,
  };
  return client;
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
