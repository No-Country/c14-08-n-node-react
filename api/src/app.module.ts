import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './users/user.module';
// import { AdvocatesModule } from './advocates/advocates.module';
import { CommonModule } from './common/common.module';
import { TypesAppointmentsModule } from './types-appointments/types-appointments.module';
import { ConfigModule } from '@nestjs/config';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST_LOCAL,
      username: process.env.DB_USER_NAME_LOCAL,
      password: process.env.DB_PASSWORD_LOCAL,
      database: process.env.DB_DATA_BASE_LOCAL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RolModule,
    UsuarioModule,
    CommonModule,
    TypesAppointmentsModule,
    QuotesModule,
  ],
})
export class AppModule {}
