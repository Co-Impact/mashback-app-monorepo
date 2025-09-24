import { authenticator } from 'otplib';
import { PrismaClient } from '@prisma/client';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class AuthDao {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  generateTotpToken(secret: string): string {
    return authenticator.generate(secret);
  }

  getUser(data: { email: string }) {
    const { email } = data;
    return this.prismaClient.user.findUnique({
      where: { email },
    });
  }

  validateTotpToken(token: string, secret: string): boolean {
    return authenticator.check(token, secret);
  }

  validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const payload = this.jwtService.decode(token);
        if (!payload || typeof payload !== 'object') {
          throw new UnauthorizedException('Invalid token structure');
        }
        const { iat, exp, ...rest } = payload as Record<string, any>;
        console.log({ iat, exp });
        return this.generateToken(rest);
      }
      throw new HttpException('', HttpStatus.UNAUTHORIZED);
    }
  }

  async validateUser(data: {
    email: string;
    password: string;
  }): Promise<{ user: any; isError: boolean }> {
    const { email, password } = data;
    const user = await this.prismaClient.user.findFirst({
      where: {
        email,
        isActive: true,
        deletedAt: null,
      },
    });
    console.log(user);
    if (!user) {
      throw new HttpException(
        'ErrorMessages.AUTH.INVALID_CREDENTIALS',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return { user, isError: false };
    }

    delete user.password;
    return { user, isError: true };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  generateToken(payload: Record<string, any>): string {
    return this.jwtService.sign(payload);
  }

  async createUser(data: any) {
    return this.prismaClient.user.create({ data });
  }

  async createUserInvitation(data: { email: string }) {
    return this.prismaClient.$transaction(async (tx) => {
      const existingUser = await tx.invitation.findMany({
        where: { email: data.email },
      });
      const existingInvitation = await tx.invitation.findMany({
        where: { email: data.email },
      });
      console.log('existingInvitation', existingInvitation);
      if (existingUser || existingInvitation)
        return this.prismaClient.invitation.createMany({
          data: data as any,
          skipDuplicates: true,
        });
    });
  }

  createLoginRecord(
    userId: string,
    userAgent: any,
    ip: string,
    isSuccess = true,
  ) {
    return this.prismaClient.$transaction(async (tx) => {
      const userAgentData = this.getUserAgent(userAgent);
      const userAgentRecord = await tx.userAgent.create({
        data: {
          browser: userAgentData.browser.name,
          device: userAgentData.device.model,
          os: userAgentData.os.name,
        },
      });
      return tx.loginHistory.create({
        data: {
          userId,
          methodUsed: 'EMAIL',
          ipAddress: ip,
          location: '',
          success: isSuccess,
          userAgentId: userAgentRecord.id,
        },
      });
    });
  }

  getUserAgent(headers: any) {
    const details = new UAParser(headers['user-agent']);
    return {
      browser: details.getBrowser(),
      device: details.getDevice(),
      engine: details.getEngine(),
      os: details.getOS(),
    };
  }

  getAllUsersInvited() {
    return this.prismaClient.invitation.findMany();
  }

  validInvitation(email: string) {
    return this.prismaClient.$transaction(async (tx) => {
      tx.user.findFirstOrThrow({
        where: {
          email,
        },
      });
      return tx.invitation.findFirstOrThrow({
        where: { email },
      });
    });
  }

  forgetPassword(email: string) {
    return this.prismaClient.$transaction(async (tx) => {
      const user = await tx.user.findFirstOrThrow({
        where: { email },
      });
      const resetToken = this.generateToken({ email: user.email });
      return tx.passwordReset.create({
        data: {
          userId: user.id,
          token: resetToken,
          expiresAt: new Date(Date.now() + 3600000),
        },
      });
    });
  }

  resetPassword(token: string, password: string) {
    return this.prismaClient.$transaction(async (tx) => {
      const tokenRecord = await tx.passwordReset.findFirstOrThrow({
        where: { token },
        include: { user: true },
      });
      if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
        throw new BadRequestException('Invalid or expired token');
      }
      const hashedPassword = await this.hashPassword(password);
      return tx.user.update({
        where: { id: tokenRecord.user.id },
        data: { password: hashedPassword },
      });
    });
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    try {
      return await this.prismaClient.$transaction(async (tx) => {
        const userRecord = await tx.user.findFirstOrThrow({
          where: { id: userId },
        });
        if (
          !userRecord ||
          !(await bcrypt.compare(oldPassword, userRecord.password))
        ) {
          throw new BadRequestException('Old password is incorrect');
        }
        const hashedPassword = await this.hashPassword(newPassword);
        await tx.user.update({
          where: { id: userRecord.id },
          data: { password: hashedPassword },
        });
        return { message: 'Password changed successfully', success: true };
      });
    } catch (error) {
      return error;
    }
  }

  async modifyUserStatus(
    id: string,
    options: { deactivate?: boolean; delete?: boolean },
  ) {
    const updates: any = {};

    if (options.delete) {
      updates.deletedAt = new Date();
      updates.isActive = false;
    } else if (options.deactivate) {
      updates.isActive = false;
    }

    if (Object.keys(updates).length === 0) {
      updates.deletedAt = null;
      updates.isActive = true;
    }

    return this.prismaClient.user.update({
      where: { id },
      data: updates,
    });
  }
}
