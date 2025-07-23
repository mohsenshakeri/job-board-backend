import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job)
        private jobRepository: Repository<Job>,
    ) { }

    findAll(): Promise<Job[]> {
        return this.jobRepository.find({
            where: { isActive: true },
            order: { createdAt: 'DESC' },
        });
    }


    async create(dto: CreateJobDto, userId: number): Promise<Job> {
        const newJob = this.jobRepository.create({
            ...dto,
            createdBy: { id: userId },
        });
        return this.jobRepository.save(newJob);
    }

    async findOne(id: number): Promise<Job> {
        const job = await this.jobRepository.findOne({
            where: { id, isActive: true },
        });

        if (!job) {
            throw new NotFoundException('Job not found or inactive');
        }

        return job;
    }



    async update(id: number, dto: UpdateJobDto): Promise<any> {
        const job = await this.jobRepository.findOne({ where: { id } });

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        await this.jobRepository.update(id, dto);
        return { message: 'Job updated successfully' };
    }

    async delete(id: number): Promise<any> {
        const job = await this.jobRepository.findOne({ where: { id } });
        if (!job) {
            throw new NotFoundException('Job not found');
        }

        await this.jobRepository.delete(id);
        return { message: 'Job deleted successfully' };
    }

}