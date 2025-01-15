import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UserPayloadDto {
  @ApiProperty({ description: 'The googleId of the user' })
  @IsString()
  googleId: string;

  @ApiProperty({ description: 'The email address of the user' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The name of the user' })
  @IsOptional()
  @IsString()
  name: string;
}
