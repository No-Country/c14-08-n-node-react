import { UsuarioController } from './user.controller';
import { UsuarioService } from './user.service';
import { User } from './models/user.entity';
import { Client } from './models/client.entity';
import { RolModule } from 'src/rol/rol.module';
import { CommonModule } from 'src/common/common.module';
import { Lawyer } from './models/lawyer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from 'src/Global/functions/AuthMiddleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Client, Lawyer]),
    RolModule,
    CommonModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'users/filtrar', method: RequestMethod.GET },
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users/create', method: RequestMethod.POST },
        { path: 'users/:id', method: RequestMethod.GET },
        // 'users/(.*)',
      )
      .forRoutes(UsuarioController); // Define las rutas que deseas proteger
  }
}
