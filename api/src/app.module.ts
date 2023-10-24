import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './users/user.module';
import { AdvocatesModule } from './advocates/advocates.module';
import { CommonModule } from './common/common.module';
import { TypesAppointmentsModule } from './types-appointments/types-appointments.module';
import { ConfigModule } from '@nestjs/config';
import { QuotesModule } from './quotes/quotes.module';
import { AuthMiddleware } from './Global/functions/AuthMiddleware';

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
    TypesAppointmentsModule,
    QuotesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        'https://abogado-back.onrender.com/api/v1/users/',
        'https://abogado-back.onrender.com/api/v1/users/login',
      ); // Define las rutas que deseas proteger
  }
}
