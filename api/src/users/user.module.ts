
import { UsuarioController } from './user.controller';
import { UsuarioService } from './user.service';
import { User } from './models/user.entity';
import { Client } from './models/client.entity';
import { RolModule } from 'src/rol/rol.module';
import { CommonModule } from 'src/common/common.module';
import { Lawyer } from './models/lawyer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Client, Lawyer]),
    RolModule,
    CommonModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
