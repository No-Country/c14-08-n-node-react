import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Qoutes } from 'src/quotes/entities/quotes.entity';

@Entity()
export class Advocate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', { default: 0 })
  price: number;

  @Column({
    default:
      'https://s3.ppllstatics.com/elnortedecastilla/www/pre2017/multimedia/noticias/201501/12/media/cortadas/facebook-profile-picture-no-pic-avatar--575x323.jpg',
  })
  @Column()
  descripcion: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('uuid', { unique: true })
  idUser: string;

  @OneToMany(()=>Qoutes,(qoute)=>qoute.id)
  qoute:Qoutes[];
}
