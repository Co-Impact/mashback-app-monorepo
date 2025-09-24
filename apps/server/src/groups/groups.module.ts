import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { GroupDao } from './group.dao';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, GroupDao, PrismaClient],
})
export class GroupsModule {}
