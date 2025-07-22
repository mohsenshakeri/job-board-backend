import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
     ConfigModule.forRoot({ isGlobal: true }), 
     TypeOrmModule.forRootAsync(typeOrmConfig),
     AuthModule, UsersModule, JobsModule, ApplicationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
