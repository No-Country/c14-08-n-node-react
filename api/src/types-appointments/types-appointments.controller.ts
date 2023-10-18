import { Controller, Post, Get, Put, Param, Delete, NotFoundException, Res, Body  } from '@nestjs/common';
import { Response } from 'express';
import { TypesAppointmentsService } from './types-appointments.service';

@Controller('types-appointments')
export class TypesAppointmentsController {
	constructor(private typesAppointmentService: TypesAppointmentsService){}

	@Post()
	async create(@Body('name') name: string, @Res() res: Response){
		try{
			const response=await this.typesAppointmentService.create(name)

			return res.status(201).json({"message":"appointment type created successfully", "body":response})

		}catch(error){
			throw new NotFoundException('', error.message);
		}
	}

	@Get()
	async findAll(@Res() res: Response){
		try{
			const response= await this.typesAppointmentService.findAll();

			return res.status(200).json({"message":"types of appointments", "body":response})

		}catch(error){
			 throw new NotFoundException('search error', error.message);
		}
	}

	@Get(':id')
	async findById(@Param('id') id: string, @Res() res: Response){
		try{
			const response= await this.typesAppointmentService.findById(id);

			return res.status(200).json({"message":"appointment type", "body":response})
		}catch(error){
			throw new NotFoundException('search error', error.message);
		}
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body('name') name: string, @Res() res: Response){
		try{
			const response= await this.typesAppointmentService.update(id, name);

			return res.status(200).json({"message":"updated dating types", "body":response})
		}catch(error){
			throw new NotFoundException('search error', error.message);
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: string, @Res() res: Response){
		try{
			const response= await this.typesAppointmentService.remove(id);

			return res.status(200).json({"message":"deleted quote", "body":response})
		}catch(error){
			throw new NotFoundException('search error', error.message);
		}
	}


}
