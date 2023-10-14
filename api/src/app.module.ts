import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './users/user.module';
import { AdvocatesModule } from './advocates/advocates.module';
import { CommonModule } from './common/common.module';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATA_BASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RolModule,
    UsuarioModule,
    AdvocatesModule,
    CommonModule,
    ClientsModule,
  ],
})
export class AppModule {}
