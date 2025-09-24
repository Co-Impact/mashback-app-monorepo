import { Injectable } from '@nestjs/common';
import { JobDao } from './jobs.dao';

@Injectable()
export class JobsService {
  constructor(private readonly jobDao: JobDao) {}
  createJob(data) {
    return this.jobDao.createJob(data);
  }

  getAllJobs() {
    return this.jobDao.getAllJobs();
  }

  getJobByID(id: string) {
    return this.jobDao.getJobByID(id);
  }

  updateJob(id: string, data) {
    return this.jobDao.updateJob(id, data);
  }

  deleteJob(id: string) {
    return this.jobDao.deleteJob(id);
  }
}
