import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './users/user.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';

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
      autoLoadEntities: true,
    }),
    RolModule,
    UsuarioModule,
    CommonModule,
  ],
})
export class AppModule {}
