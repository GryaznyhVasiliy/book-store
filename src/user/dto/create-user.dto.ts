import { IsString, IsBoolean } from 'class-validator';

export class CreateUserDTO 
{
  @IsString()
  name: string;

  @IsBoolean()
  subscribe: boolean;
}