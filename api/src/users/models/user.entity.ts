import { Rol } from 'src/rol/models/rol.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  last_Name: string;
  @Column()
  Phone: string;
  @Column()
  birthdate: Date;
  @Column()
  email: string;
  @Column()
  pass: string;
  @ManyToOne(() => Rol, (rol) => rol.users)
  @JoinColumn({ name: 'rolId' })
  rolId: Rol;
}
