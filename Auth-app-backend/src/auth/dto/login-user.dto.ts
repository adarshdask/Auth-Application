import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsEmail({}, { message: 'Field $property must be a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  password: string;
}