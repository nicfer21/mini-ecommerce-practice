import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsEnum, IsString, MaxLength } from 'class-validator';

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MaxLength(150)
  name?: string;

  @IsEmail()
  @MaxLength(100)
  email?: string;

  @IsString()
  password?: string;

  @IsEnum(Role)
  role?: Role;
}
