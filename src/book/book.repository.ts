import { Repository, EntityRepository, getConnection, getRepository} from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDTO } from './dto/create-book.dto';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {

  public async createBook(createBookDto: CreateBookDTO): Promise<Book> {
    const { name} = createBookDto;

    const book = new Book();
    book.name = name;

    await book.save();
    return book;
  }

  public async orderBook(createBookDto: CreateBookDTO, orderedBook: Book): Promise<Book> 
  {
    const { owner } = createBookDto;

    orderedBook.owner = owner;
    await orderedBook.save();

    return orderedBook;
  }

  public async stopOrderBook(createBookDto: CreateBookDTO, stopedOrderBook: Book): Promise<Book>
  {
    const { owner } = createBookDto;

    stopedOrderBook.owner = null;
    await stopedOrderBook.save();

    return stopedOrderBook;
  }
}