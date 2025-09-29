import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Team } from '../type/team.type';

@Injectable()
export class TeamDao {
  constructor(private readonly prismaClient: PrismaClient) {}
  createTeam(data: Team) {
    return this.prismaClient.$transaction(async (tx) => {
      const team = await tx.team.create({
        data: { name: data.name, ownerId: data.ownerId },
      });
      if (data.members && data.members.length > 0) {
        const members = data.members.map((member: string) => ({
          userId: member,
          teamId: team.id,
        }));
        const teamMembers = await tx.teamMember.createMany({ data: members });
      }
      return tx.team.findUnique({
        where: { id: team.id },
        include: { members: true },
      });
    });
  }

  getTeams() {
    return this.prismaClient.team.findMany({
      where: {
        isActive: true,
      },
      include: {
        owner: true,
        members: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
    });
  }

  getUserTeams(userId: string) {
    return this.prismaClient.team.findMany({
      where: {
        deletedAt: null,
        isActive: true,
        OR: [
          { ownerId: userId },
          {
            members: {
              some: { userId },
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        owner: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
    });
  }

  getTeam(id: string) {
    return this.prismaClient.team.findUniqueOrThrow({
      where: { id },
      include: {
        owner: true,
        members: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
    });
  }

  deleteTeam(id: string) {
    return this.prismaClient.team.update({
      where: { id },
      data: { isActive: false },
    });
  }

  updateTeam(id: string, data: any) {
    return this.prismaClient.team.update({
      where: { id },
      data,
    });
  }
}
