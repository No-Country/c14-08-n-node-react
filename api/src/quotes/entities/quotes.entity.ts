import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TypesAppointments } from 'src/types-appointments/entities/typesAppointments.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Advocate } from 'src/advocates/entities/advocate.entity';

@Entity()
export class Qoutes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  applicationDate: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  confirmationDate: Date;

  @Column({ default: false })
  confirmation: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  finishDate: Date;

  @ManyToOne(()=>TypesAppointments,(appointment)=> appointment.id )
  appointment: TypesAppointments[];

  @ManyToOne(()=>Client,(client)=>client.id)
  client:Client;

  @ManyToOne(()=>Advocate,(advocate)=>advocate.id)
  advocate:Advocate;

}