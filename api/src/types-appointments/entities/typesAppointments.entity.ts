import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Qoutes } from 'src/quotes/entities/quotes.entity';

@Entity()
export class TypesAppointments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @OneToMany(() => Qoutes, (qoute) => qoute.id)
  quetes: Qoutes[];
}
