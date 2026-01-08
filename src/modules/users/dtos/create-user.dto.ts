import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  firebaseUid: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'email@teste.com', required: true })
  email: string
}
