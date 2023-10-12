import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Advocate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', { default: 0 })
  price: number;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('uuid')
  idUser: string;
}
