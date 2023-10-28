import { Rol } from 'src/rol/models/rol.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lawyer } from './lawyer.entity';
import { Client } from './client.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  lastName: string | null;
  @Column({ nullable: true })
  Phone: string | null;
  @Column({ nullable: true })
  birthdate: Date | null;
  @Column()
  email: string;
  @Column()
  pass: string;
  @ManyToOne(() => Rol, (rol) => rol.users)
  @JoinColumn({ name: 'rolId' })
  rolId: Rol;
  @OneToMany(() => Lawyer, (lawyer) => lawyer.user)
  @JoinColumn({ name: 'lawyerId' })
  lawyer: Lawyer[];
  @OneToMany(() => Client, (client) => client.user)
  @JoinColumn({ name: 'clientId' })
  client: Client[];
}
