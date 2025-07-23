import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from './entities/user.entity';



@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {

    }



    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users (admin only)' })
    @ApiResponse({ status: 200, description: 'List of users returned' })
    @ApiResponse({ status: 403, description: 'Forbidden: Only admins allowed' })
    getAllUsers() {
        return this.usersService.findAll();
    }



  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get single user by ID (admin only)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

}
