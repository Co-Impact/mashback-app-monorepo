import { Body, Controller, Get, Headers, Ip, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/base/login.dto';
import { SignupDto } from './dto/base/signup.dto';

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
  createUser(
    @Body() data: SignupDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: any,
  ) {
    return this.authService.signup(data, ip, userAgent);
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
