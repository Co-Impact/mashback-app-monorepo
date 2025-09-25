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
    return this.prismaClient.user.findMany();
  }
}
