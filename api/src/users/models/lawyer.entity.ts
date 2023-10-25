import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Lawyer {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    default:
      'https://s3.ppllstatics.com/elnortedecastilla/www/pre2017/multimedia/noticias/201501/12/media/cortadas/facebook-profile-picture-no-pic-avatar--575x323.jpg',
  })
  imagen: string;
  @Column({ default: '0' })
  price: string;
  @Column({default:"Abogado Con excelente habilidades muy bueno"})
  description: string;
  @Column({ default: false })
  isActive: boolean;
  @OneToOne(() => User)
  @JoinColumn({ name: 'lawyerId' })
  user: User;
}
