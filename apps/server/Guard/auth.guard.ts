import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string = request.headers['authorization']?.replace(
      'Bearer ',
      '',
    );
    const role: string = request.headers['role'];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    if (role) {
      // TODO: need to implement role-based access control
      return true;
    }

    try {
      const isValid = await this.authService.validateToken(token);
      if (!isValid) {
        throw new UnauthorizedException('Invalid token');
      }

      request.user = { user: isValid.username, exp: isValid.exp };
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
