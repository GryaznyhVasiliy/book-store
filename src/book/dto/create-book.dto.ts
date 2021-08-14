import { IsObject, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';

export class CreateBookDTO {
  @IsString()
  name: string;

  @IsObject()
  owner: User;
}