import { User } from 'src/users/models/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity({ name: 'rol' })
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'boolean', default: true })
  activate: boolean;
  @OneToMany(() => User, (user) => user.rolId)
  users: User[];
}
