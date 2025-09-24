import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDao } from './event.dao';

@Injectable()
export class EventsService {
  constructor(private readonly eventDao: EventDao) {}
  createEvent(createEventDto: CreateEventDto) {
    return this.eventDao;
  }

  getAllEvents() {
    return `This action returns all events`;
  }

  getEventByID(id: number) {
    return `This action returns a #${id} event`;
  }

  updateEvent(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  deleteEvent(id: number) {
    return `This action removes a #${id} event`;
  }
}
