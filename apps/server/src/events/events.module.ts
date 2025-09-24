import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventDao } from './event.dao';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventDao, PrismaClient],
})
export class EventsModule {}
