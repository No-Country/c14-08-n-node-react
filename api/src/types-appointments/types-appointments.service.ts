import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypesAppointments } from './entities/typesAppointments.entity';

@Injectable()
export class TypesAppointmentsService {
	constructor(
		@InjectRepository(TypesAppointments)
		private typesAppointmentRepository: Repository<TypesAppointments>,
		){}

	async create(name:string){
		const response= this.typesAppointmentRepository.create({name})

		return await this.typesAppointmentRepository.save(response)
	}

	async findAll(){
		return await this.typesAppointmentRepository.find();
	}

	async findById(id: string){
		const response = await this.typesAppointmentRepository.findOne({ where: { id } });

		if(!response){
			throw new NotFoundException('Id no encontrado');
		}

		return response;
	}

	async update(id:string, name:string){
		const response = await this.typesAppointmentRepository.findOne({ where: { id } });

		if(!response){
			throw new NotFoundException('Id no encontrado');
		}

		response.name=name;
		return await this.typesAppointmentRepository.save(response);
	}

	async remove(id:string){
		const response = await this.typesAppointmentRepository.findOne({ where: { id } });

		if(!response){
			throw new NotFoundException('Id no encontrado');
		}

		return await this.typesAppointmentRepository.remove(response);
	}
}
