import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdvocatesService } from './advocates.service';
import { CreateAdvocateDto } from './dto/create-advocate.dto';
import { UpdateAdvocateDto } from './dto/update-advocate.dto';

@Controller('advocates')
export class AdvocatesController {
  constructor(private readonly advocatesService: AdvocatesService) {}

  @Post()
  create(@Body() createAdvocateDto: CreateAdvocateDto) {
    return this.advocatesService.create(createAdvocateDto);
  }

  @Get()
  findAll() {
    return this.advocatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advocatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvocateDto: UpdateAdvocateDto) {
    return this.advocatesService.update(+id, updateAdvocateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advocatesService.remove(+id);
  }
}
