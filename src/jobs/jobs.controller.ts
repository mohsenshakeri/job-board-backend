import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Job } from './entities/job.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';



@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all active jobs (public)' })
    @ApiResponse({ status: 200, description: 'List of jobs', type: [Job] })
    findAll() {
        return this.jobsService.findAll();
    }



    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new job (admin only)' })
    @ApiResponse({ status: 201, description: 'Job created successfully', type: Job })
    @ApiResponse({ status: 403, description: 'Forbidden: Only admins can create jobs' })
    @ApiBody({ type: CreateJobDto })
    createJob(@Body() dto: CreateJobDto, @Request() req) {
        return this.jobsService.create(dto, req.user.userId);
    }

}
