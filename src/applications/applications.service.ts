import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ApplicationsService {
    constructor(
        @InjectRepository(Application)
        private readonly appRepo: Repository<Application>,
        @InjectRepository(Job)
        private readonly jobRepo: Repository<Job>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }





    async apply(jobId: number, userId: number): Promise<Application> {
        const job = await this.jobRepo.findOne({ where: { id: jobId } });
        if (!job) {
            throw new NotFoundException('Job not found');
        }

        const alreadyApplied = await this.appRepo.findOne({
            where: {
                job: { id: jobId },
                applicant: { id: userId },
            },
        });

        if (alreadyApplied) {
            throw new BadRequestException('You have already applied to this job');
        }

        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const newApp = this.appRepo.create({
            job,
            applicant: user,
        });

        return this.appRepo.save(newApp);
    }


    async getApplicationsByUser(userId: number): Promise<Application[]> {
        return this.appRepo.find({
            where: { applicant: { id: userId } },
            order: { appliedAt: 'DESC' },
        });
    }


    async getAll(): Promise<Application[]> {
        return this.appRepo.find({
            order: { appliedAt: 'DESC' },
        });
    }
}
