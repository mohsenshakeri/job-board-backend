import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [AuthModule, UsersModule, JobsModule, ApplicationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
