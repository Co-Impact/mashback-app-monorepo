import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JobDao {
  constructor(private readonly prismaClient: PrismaClient) {}

  createJob(data) {
    return this.prismaClient.job.create({ data });
  }

  getAllJobs() {
    return this.prismaClient.job.findMany();
  }

  getJobByID(id: string) {
    return this.prismaClient.job.findUniqueOrThrow({ where: { id } });
  }

  updateJob(id: string, data) {
    return this.prismaClient.job.update({ where: { id }, data });
  }

  submitJob(id: string, data) {
    return { id, data };
  }

  deleteJob(id: string) {
    return this.prismaClient.job.delete({ where: { id } });
  }
}
