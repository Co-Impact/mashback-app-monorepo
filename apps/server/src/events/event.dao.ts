import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EventDao {
  constructor(private readonly prismaClient: PrismaClient) {}

  createEvent(data) {
    return this.prismaClient.events.create({ data });
  }

  getAllEvents() {
    return this.prismaClient.events.findMany();
  }

  getEventByID(id: string) {
    return this.prismaClient.events.findUniqueOrThrow({ where: { id } });
  }

  getEventFilter() {
    return this.prismaClient.events.findMany();
  }

  updateEvent(id: string, data) {
    return this.prismaClient.events.update({ where: { id }, data });
  }

  deleteEvent(id: string) {
    return this.prismaClient.events.delete({ where: { id } });
  }
}
