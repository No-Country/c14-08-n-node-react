import { Rol } from 'src/rol/models/rol.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column()
  IdRol: string;
  @ManyToOne(() => Rol, (rol_user) => rol_user.rol)
  rol_user: Rol;
}
