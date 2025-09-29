import { Injectable, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class userDao {
  constructor(private readonly prismaClient: PrismaClient) {}
  @Post()
  inviteUser(data) {
    return true;
  }

  getUserById(id: string) {
    return this.prismaClient.user.findUniqueOrThrow({ where: { id } });
  }

  searchUsers(query: string) {
    return this.prismaClient.user.findMany({
      where: {
        OR: [
          { firstName: { contains: query } },
          { lastName: { contains: query } },
          { email: { contains: query } },
          { phoneNumber: { contains: query } },
        ],
      },
    });
  }

  getAllUsers() {
    return this.prismaClient.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        university: true,
        dateOfBirth: true,
        company: true,
        position: true,
        group: true,
        isActive: true,
        eventSubmissions: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  updateUser(id: string, data) {
    return this.prismaClient.user.update({
      where: { id },
      data,
    });
  }
}
