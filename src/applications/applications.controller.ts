import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Application } from './entities/application.entity';




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

}
