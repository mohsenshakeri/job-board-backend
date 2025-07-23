import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsService implements OnModuleInit {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async onModuleInit() {
    const jobCount = await this.jobRepository.count();
    if (jobCount === 0) {
      const newJob = this.jobRepository.create({
        title: 'NestJS Developer',
        description: 'Develop APIs using NestJS and PostgreSQL',
        company: 'OpenAI',
        location: 'Remote',
      });

      await this.jobRepository.save(newJob);
      console.log('✅ Test job created');
    }
  }
}