import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lawyer } from './lawyer.entity';
import { Client } from './client.entity';
import { typeAppointment } from './appointment_type';
import { modality } from './modality.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'date', nullable: true })
  fecha: Date | null;
  @Column()
  time: string;
  @Column()
  link: string;
  @ManyToOne(() => Lawyer)
  @JoinColumn({ name: 'lawyerId' })
  lawyer: Lawyer;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @ManyToOne(() => typeAppointment)
  @JoinColumn({ name: 'statusId' })
  status: typeAppointment;

  @ManyToOne(() => modality)
  @JoinColumn({ name: 'modalityId' })
  modality: modality;
}
