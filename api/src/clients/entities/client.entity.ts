import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/models/user.entity'
import { Qoutes } from 'src/quotes/entities/quotes.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(()=>User)
  @JoinColumn()
  user: User;

  @OneToMany(()=>Qoutes,(qoute)=>qoute.id)
  qoute:Qoutes[];
}