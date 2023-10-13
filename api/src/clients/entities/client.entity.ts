import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isActive: boolean;

  @Column('uuid', { unique: true })
  idUser: string;
}