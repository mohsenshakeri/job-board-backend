import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ example: 'Frontend Developer' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Develop UI in React and TypeScript' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Google' })
  @IsString()
  company: string;

  @ApiProperty({ example: 'Helsinki, Finland' })
  @IsString()
  location: string;
}