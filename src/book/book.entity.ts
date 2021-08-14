import { User } from 'src/user/user.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Book extends BaseEntity 
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (owner: User) => owner.books, {nullable: true})
  public owner: User;
}