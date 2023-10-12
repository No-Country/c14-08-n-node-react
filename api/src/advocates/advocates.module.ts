import { Module } from '@nestjs/common';
import { AdvocatesService } from './advocates.service';
import { AdvocatesController } from './advocates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advocate } from './entities/advocate.entity';

@Module({
  controllers: [AdvocatesController],
  providers: [AdvocatesService],
  imports: [TypeOrmModule.forFeature([Advocate])],
})
export class AdvocatesModule {}
