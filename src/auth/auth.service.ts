import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt' 
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService) { }



        
  /**
   * Registers a new user with hashed password
   */
  async register(registerDto: RegisterDto) {
    const { email, password,role} = registerDto;

    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new UnauthorizedException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({ email, password: hashedPassword,role:role });
  }



    /**
      * Generates JWT access token
      */
    async login(user: any) {
        const payload = { email: user.email, sub: user.id,role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }



  /**
   * Validates user credentials during login
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }




}
