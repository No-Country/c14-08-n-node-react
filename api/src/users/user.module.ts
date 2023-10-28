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
import { type } from './models/type.entity';
import { modality } from './models/modality.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Client, Lawyer, type, modality]),
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
        { path: 'users/load/types', method: RequestMethod.GET },
        { path: 'users/loading/type', method: RequestMethod.GET },
        { path: 'users/loading/type/modality', method: RequestMethod.GET },
        {
          path: 'users/loading/type/filter/modality',
          method: RequestMethod.GET,
        },
        // 'users/(.*)',
      )
      .forRoutes(UsuarioController); // Define las rutas que deseas proteger
  }
}
