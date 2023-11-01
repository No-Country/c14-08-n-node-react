import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from './appointment.entity';
@Entity()
export class typeAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  @OneToMany(() => Appointment, (appo) => appo.status)
  appo: Appointment[];
}
