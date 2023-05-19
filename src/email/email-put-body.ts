import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailPutBody {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public message: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public to: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public subject: string;
}
