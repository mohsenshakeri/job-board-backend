import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Application } from './entities/application.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';




@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) { }


    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Apply to a job (user only)' })
    @ApiResponse({ status: 201, description: 'Application submitted successfully', type: Application })
    @ApiResponse({ status: 400, description: 'Already applied or job not found' })
    applyToJob(
        @Body() dto: CreateApplicationDto,
        @Request() req,
    ) {
        return this.applicationsService.apply(dto.jobId, req.user.userId);
    }



    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user\'s job applications' })
    @ApiResponse({ status: 200, description: 'List of user applications', type: [Application] })
    getMyApplications(@Request() req) {
        return this.applicationsService.getApplicationsByUser(req.user.userId);
    }


    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all job applications (admin only)' })
    @ApiResponse({ status: 200, description: 'List of all applications', type: [Application] })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    getAllApplications() {
        return this.applicationsService.getAll();
    }
}
