import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  inviteUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.inviteUser('sdfsd');
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('search')
  searchUsers(@Body('query') query: string) {
    return this.usersService.searchUsers(query);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
