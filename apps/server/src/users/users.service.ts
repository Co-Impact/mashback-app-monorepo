import { Injectable } from '@nestjs/common';
import { userDao } from './user.dao';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userDao: userDao) {}

  inviteUser(email: string) {
    return this.userDao.inviteUser({ email });
  }

  getUserById(id: string) {
    return this.userDao.getUserById(id);
  }

  searchUsers(query: string) {
    return this.userDao.searchUsers(query);
  }

  getAllUsers() {
    return this.userDao.getAllUsers();
  }

  updateUser(id: string, data: UpdateUserDto) {
    return this.userDao.updateUser(id, data);
  }
}
