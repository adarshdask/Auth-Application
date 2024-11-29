import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  name: string;

  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsEmail({}, { message: 'Field $property must be a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @MinLength(8, { message: 'Field $property must be at least 8 characters long.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, {
    message:
      'Field $property must include at least one letter, one number, and one special character.',
  })
  password: string;
}