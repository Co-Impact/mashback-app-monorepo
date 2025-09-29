import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { JobsModule } from './jobs/jobs.module';
import { PollsModule } from './polls/polls.module';
import { EventsModule } from './events/events.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { TeamController } from './users/controllers/team.controller';
import { userDao } from './users/dao/user.dao';
import { TeamService } from './users/service/team.service';
import { TeamDao } from './users/dao/team.dao';
import { PrismaClient } from '@prisma/client';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    UsersModule,
    GroupsModule,
    JobsModule,
    PollsModule,
    EventsModule,
    NotificationsModule,
    AuthModule,
  ],
  controllers: [AppController, TeamController],
  providers: [
    AppService,
    userDao,
    TeamService,
    TeamDao,
    PrismaClient,
    AuthService,
  ],
})
export class AppModule {}
