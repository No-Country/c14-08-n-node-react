import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

}