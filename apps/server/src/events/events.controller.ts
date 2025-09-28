import { Body, Controller, Delete, Get, Param, Patch, Post, } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get()
  findAllEvent() {
    return this.eventsService.getAllEvents();
  }

  @Post('filter')
  getEventsFilter(@Body() data: any) {
    // return this
  }

  @Get(':id')
  getEventByID(@Param('id') id: string) {
    return this.eventsService.getEventByID(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
