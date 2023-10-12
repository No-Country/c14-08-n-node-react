import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AdvocatesService } from './advocates.service';
import { CreateAdvocateDto } from './dto/create-advocate.dto';
import { UpdateAdvocateDto } from './dto/update-advocate.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('advocates')
export class AdvocatesController {
  constructor(private readonly advocatesService: AdvocatesService) {}

  @Post()
  create(@Body() createAdvocateDto: CreateAdvocateDto) {
    return this.advocatesService.create(createAdvocateDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.advocatesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.advocatesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAdvocateDto: UpdateAdvocateDto,
  ) {
    return this.advocatesService.update(id, updateAdvocateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.advocatesService.remove(id);
  }
}
