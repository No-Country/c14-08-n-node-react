import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class modality {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
