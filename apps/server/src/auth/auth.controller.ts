import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

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
  login(@Body() data: any) {
    return this.authService.login(data);
  }

  @Get('logout')
  logout() {
    return { message: 'User logged out successfully' };
  }
}
