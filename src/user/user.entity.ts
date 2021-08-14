import { Book } from 'src/book/book.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity 
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  subscribe: boolean;

  @OneToMany(() => Book, (book: Book) => book.owner)
  public books: Book[];
}