import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Job } from './entities/job.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UpdateJobDto } from './dto/update-job.dto';



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


    @Get(':id')
    @ApiOperation({ summary: 'Get job details by ID (public)' })
    @ApiParam({ name: 'id', type: Number, example: 1 })
    @ApiResponse({ status: 200, description: 'Job details returned', type: Job })
    @ApiResponse({ status: 404, description: 'Job not found or inactive' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.jobsService.findOne(id);
    }


    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update job by ID (admin only)' })
    @ApiParam({ name: 'id', type: Number, example: 1 })
    @ApiResponse({ status: 200, description: 'Job updated successfully' })
    @ApiResponse({ status: 404, description: 'Job not found' })
    updateJob(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateJobDto,
    ) {
        return this.jobsService.update(id, dto);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete job by ID (admin only)' })
    @ApiParam({ name: 'id', type: Number, example: 1 })
    @ApiResponse({ status: 200, description: 'Job deleted successfully' })
    @ApiResponse({ status: 404, description: 'Job not found' })
    deleteJob(@Param('id', ParseIntPipe) id: number) {
        return this.jobsService.delete(id);
    }
}
