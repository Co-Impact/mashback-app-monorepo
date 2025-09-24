import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GroupDao {
  constructor(private readonly prismaClient: PrismaClient) {}
  createGroup(data) {
    return this.prismaClient.group.create({ data });
  }

  getAllGroups() {
    return this.prismaClient.group.findMany();
  }

  getGroupByID(id: string) {
    return this.prismaClient.group.findUniqueOrThrow({ where: { id } });
  }

  updateGroup(id: string, data) {
    return this.prismaClient.group.update({ where: { id }, data });
  }

  deleteGroup(id: string) {
    return this.prismaClient.group.delete({ where: { id } });
  }
}
