import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class type {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
