import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';

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

}