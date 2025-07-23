import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {

    @ApiProperty({
    example: 'user@example.com',
    description: 'Valid email for user registration',
  })
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({
    example: 'strongPassword123',
    description: 'Password must be at least 6 characters long',
    minLength: 6,
  })
    password: string

    @ApiPropertyOptional({
    example: 'admin',
    description: 'Optional user role (user or admin)',
    enum: ['user', 'admin'],
    default: 'user',
  })
    @IsOptional()
    @IsIn(['user', 'admin']) // Only accept these values
    role?: 'user' | 'admin';
}