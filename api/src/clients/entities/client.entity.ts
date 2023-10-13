import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from 'src/users/models/user.entity'

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(()=>User)
  @JoinColumn()
  user: User
}