import { Injectable } from '@nestjs/common';
import { CreateAdvocateDto } from './dto/create-advocate.dto';
import { UpdateAdvocateDto } from './dto/update-advocate.dto';

@Injectable()
export class AdvocatesService {
  create(createAdvocateDto: CreateAdvocateDto) {
    return 'This action adds a new advocate';
  }

  findAll() {
    return `This action returns all advocates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} advocate`;
  }

  update(id: number, updateAdvocateDto: UpdateAdvocateDto) {
    return `This action updates a #${id} advocate`;
  }

  remove(id: number) {
    return `This action removes a #${id} advocate`;
  }
}
