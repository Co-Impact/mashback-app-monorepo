import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobDao } from './jobs.dao';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [JobsController],
  providers: [JobsService, JobDao, PrismaClient],
})
export class JobsModule {}
