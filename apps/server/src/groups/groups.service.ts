import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupDao } from './group.dao';

@Injectable()
export class GroupsService {
  constructor(private readonly groupDao: GroupDao) {}
  create(createGroupDto: CreateGroupDto) {
    return this.groupDao.createGroup(createGroupDto);
  }

  findAll() {
    return this.groupDao.getAllGroups();
  }

  findOne(id: string) {
    return this.groupDao.getGroupByID(id);
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    return this.groupDao.updateGroup(id, updateGroupDto);
  }

  remove(id: string) {
    return this.groupDao.deleteGroup(id);
  }
}
