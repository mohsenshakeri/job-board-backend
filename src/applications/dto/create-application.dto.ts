import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ example: 2, description: 'ID of the job to apply for' })
  @IsInt()
  jobId: number;
}