import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    console.log(registerDto)
    return this.authService.register(registerDto);
  }


  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }


  @UseGuards(JwtAuthGuard)
  @Post('protected')
  protected(@Request() req) {
    return { message: 'Access granted', user: req.user };
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('admin-only')
  adminRoute(@Request() req) {
    return { message: 'Welcome admin!', user: req.user };
  }

}
