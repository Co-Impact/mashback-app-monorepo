import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../../Guard/auth.guard';
import { TeamService } from '../service/team.service';

@UseGuards(AuthGuard)
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}
  @Post('create')
  createTeam(@Body() body: any) {
    return this.teamService.createTeam(body);
  }

  @Get()
  getTeams() {
    return this.teamService.getTeams();
  }

  @Get('user/:userId')
  getUserTeams(@Param('userId') userId: string) {
    return this.teamService.getUserTeams(userId);
  }

  @Get(':id')
  getTeam(@Param('id') id: string) {
    return this.teamService.getTeam(id);
  }

  @Delete(':id')
  deleteTeam(@Param('id') id: string) {
    return this.teamService.deleteTeam(id);
  }
  @Put(':id')
  updateTeam(@Param('id') id: string, @Body() body: any) {
    return this.teamService.updateTeam(id, body);
  }
}
