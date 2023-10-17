import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesAppointmentsController } from './types-appointments.controller';
import { TypesAppointmentsService } from './types-appointments.service';
import { TypesAppointments } from './entities/typesAppointments.entity';

@Module({
  controllers: [TypesAppointmentsController],
  providers: [TypesAppointmentsService],
  imports: [TypeOrmModule.forFeature([TypesAppointments])]
})
export class TypesAppointmentsModule {}
