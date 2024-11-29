import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ResponseHandler } from '../common/utils/response-handler';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/common/configs/config.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async signup(createUserData: CreateUserDto): Promise<any> {
    const { name, email, password } = createUserData;
    this.logger.log(`User Data ===> Name: ${name}, Email: ${email}`);
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      this.logger.error(`Account with Email: ${email} already exist.`);
      ResponseHandler.throwBadRequestException(
        'Account already exists. Please login to continue.',
      );
    }
    const hashedPassword = await this.passwordService.hashPassword(password);
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    this.logger.log(`Account with Email: ${email} created successfully.`);
    return ResponseHandler.sendSuccessResponse(
      newUser,
      'Account created successfully. Please login to continue.',
    );
  }

  async login(loginData: LoginUserDto) {
    const { email, password } = loginData;
    this.logger.log(`User Email ===> ${email}`);
    const user = await this.userModel.findOne({ email });
    if (!user) {
      this.logger.error(`${email} ===> Email Not Found`);
      ResponseHandler.throwUnauthorizedException('Invalid email or password.');
    }
    const isPasswordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      this.logger.error(`${email} ===> Password do not match`);
      ResponseHandler.throwUnauthorizedException('Invalid email or password.');
    }
    const payload = { email: user.email, userId: user._id };
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    const responseData = {
      accessToken,
      refreshToken,
      user: { email: user.email, name: user.name },
    };
    this.logger.log(`Login Successful`);
    this.logger.log(`Logged in user ===> Name: ${user.name}, Email: ${user.email} `);
    return ResponseHandler.sendSuccessResponse(
      responseData,
      'Login successfull',
    );
  }

  private generateAccessToken(payload: { email: string, userId: Types.ObjectId }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { email: string, userId: Types.ObjectId }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }
}
