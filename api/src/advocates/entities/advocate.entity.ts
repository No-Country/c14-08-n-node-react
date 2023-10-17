import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Qoutes } from 'src/quotes/entities/quotes.entity';

@Entity()
export class Advocate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', { default: 0 })
  price: number;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('uuid', { unique: true })
  idUser: string;

  @OneToMany(()=>Qoutes,(qoute)=>qoute.id)
  qoute:Qoutes[];
}
