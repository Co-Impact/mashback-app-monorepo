import { Body, Controller, Get, Ip, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/base/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  validateToken(@Body() data: { token: string; role: string }) {
    // TODO: Implement token validation logic for admin and user roles
    if (data.role === 'Admin') {
      return { valid: true, userId: 'adminUserId', role: 'Admin' };
    }
    return this.authService.validateToken(data.token);
  }

  @Post('signup')
  createUser(@Body() data: any) {
    return this.authService.signup(data);
  }

  @Post('login')
  login(@Body() body: LoginDto, @Ip() ip: string) {
    return this.authService.login({ userData: body, ip });
  }

  @Get('logout')
  logout() {
    return { message: 'User logged out successfully' };
  }
}
