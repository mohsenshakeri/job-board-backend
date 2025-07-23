import { Body, Controller, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';


@ApiTags('auth') // دسته‌بندی در Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input or user already exists' })
  register(@Body() registerDto: RegisterDto) {
    console.log(registerDto)
    return this.authService.register(registerDto);
  }


  @Post('login')
@ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Returns access token (JWT)' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.authService.login(user);
  }


  @UseGuards(JwtAuthGuard)
  @Post('protected')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Protected route (JWT required)' })
  @ApiResponse({ status: 200, description: 'Access granted to protected route' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  protected(@Request() req) {
    return { message: 'Access granted', user: req.user };
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('admin-only')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin-only route (JWT + role=admin)' })
  @ApiResponse({ status: 200, description: 'Access granted to admin' })
  @ApiResponse({ status: 403, description: 'Forbidden: Only admins allowed' })
  adminRoute(@Request() req) {
    return { message: 'Welcome admin!', user: req.user };
  }

}
