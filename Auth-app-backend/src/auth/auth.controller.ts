import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserData: CreateUserDto): Promise<any> {
    return this.authService.signup(createUserData);
  }

  @Post('login')
  async login(@Body() loginUserData: LoginUserDto): Promise<any> {
    return this.authService.login(loginUserData);
  }
}
