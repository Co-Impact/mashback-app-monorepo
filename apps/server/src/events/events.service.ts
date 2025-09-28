import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDao } from './event.dao';

@Injectable()
export class EventsService {
  constructor(private readonly eventDao: EventDao) {}
  createEvent(createEventDto: CreateEventDto) {
    return this.eventDao.createEvent(createEventDto);
  }

  getAllEvents() {
    return this.eventDao.getAllEvents();
  }

  getEventByID(id: string) {
    return this.eventDao.getEventByID(id);
  }

  updateEvent(id: string, data: UpdateEventDto) {
    return this.eventDao.updateEvent(id, data);
  }

  deleteEvent(id: string) {
    return this.eventDao.deleteEvent(id);
  }
}
