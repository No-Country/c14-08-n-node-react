import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid';

import { CreateAdvocateDto } from './dto/create-advocate.dto';
import { UpdateAdvocateDto } from './dto/update-advocate.dto';
import { Advocate } from './entities/advocate.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class AdvocatesService {
  private readonly logger = new Logger('AdvocatesService');

  constructor(
    @InjectRepository(Advocate)
    private readonly advocateRepository: Repository<Advocate>,
  ) {}

  async create(createAdvocateDto: CreateAdvocateDto) {
    try {
      const advocate = this.advocateRepository.create(createAdvocateDto);
      await this.advocateRepository.save(advocate);

      return advocate;
    } catch (error) {
      this.handlerDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const advocates = await this.advocateRepository.find({
      skip: offset,
      take: limit,
    });
    return advocates;
  }

  async findOne(id: string) {
    const advocate = await this.advocateRepository.findOneBy({ id });

    if (!advocate) throw new BadRequestException('El abogado no existe');

    return advocate;
  }

  async update(id: string, updateAdvocateDto: UpdateAdvocateDto) {
    const { price } = updateAdvocateDto;
    const advocate = await this.advocateRepository.preload({
      id,
      price,
    });

    if (!advocate)
      throw new NotFoundException(`Advocate with id: ${id} not found`);

    try {
      await this.advocateRepository.save(advocate);
      return advocate;
    } catch (error) {
      this.handlerDBExceptions(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    const advocate = await this.advocateRepository.preload({
      id,
      isActive: false,
    });
    console.log(advocate);

    try {
      await this.advocateRepository.save(advocate);
      return advocate;
    } catch (error) {
      this.handlerDBExceptions(error);
    }
  }

  private handlerDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    } else if (error.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException('Ya existe un abogado con ese userId');
    }
    this.logger.error(error);

    throw new InternalServerErrorException('Auxilio');
  }
}
