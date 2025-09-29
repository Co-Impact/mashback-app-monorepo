import { Injectable } from '@nestjs/common';
import { TeamDao } from '../dao/team.dao';

@Injectable()
export class TeamService {
  constructor(private readonly teamDao: TeamDao) {}
  createTeam(data: any) {
    return this.teamDao.createTeam(data);
  }

  getTeams() {
    return this.teamDao.getTeams();
  }

  getUserTeams(userId: string) {
    return this.teamDao.getUserTeams(userId);
  }

  getTeam(id: string) {
    return this.teamDao.getTeam(id);
  }

  deleteTeam(id: string) {
    return this.teamDao.deleteTeam(id);
  }

  updateTeam(id: string, data: any) {
    return this.teamDao.updateTeam(id, data);
  }
}
