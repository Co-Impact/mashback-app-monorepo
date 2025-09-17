import { Injectable } from '@nestjs/common';
import { AuthDao } from './auth.dao';

@Injectable()
export class AuthService {
  constructor(private readonly authDao: AuthDao) {}

  async validateToken(token: string) {
    return await this.authDao.validateToken(token);
  }

  async login(body: any) {
    const { userData, header, ip } = body;
    const { user, isError } = await this.authDao.validateUser({
      email: userData.email,
      password: userData.password,
    });

    if (isError) {
      await this.authDao.createLoginRecord(user.id, header, ip, false);
    }
    if (user.twoFAEnabled) {
      this.send2FactCode(user.id);
      return { user, codeSent: true };
    }
    const token = this.authDao.generateToken({
      username: user.username || user.email,
    });
    await this.authDao.createLoginRecord(user.id, header, ip);
    return { token, user };
  }

  async signup(data: any) {
    const { user, header, ip } = data;
    user.password = await this.authDao.hashPassword(user.password);
    const userRecord = await this.authDao.createUser(user);
    await this.authDao.createLoginRecord(userRecord.id, header, ip);
    const token = this.authDao.generateToken({ userId: userRecord.email });
    return { userRecord, token };
  }

  send2FactCode(userId: string) {
    // TODO: Implement the logic to send the 2FA code to the user
  }
}
