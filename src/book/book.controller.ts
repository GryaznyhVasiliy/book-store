import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create-book.dto';

@Controller('book')
export class BookController 
{
    constructor(private bookService: BookService) {}
  
    @Post('create')
    public async createBook(@Body() createBookDto: CreateBookDTO): Promise<Book> 
    {
        const book = await this.bookService.createBook(createBookDto);
        return book;
    }

    @Put('/order/:bookId')
    public async orderBook(@Body() createBookDto: CreateBookDTO,
    @Param('bookId') bookId: number): Promise<Book> 
    {
        const book = await this.bookService.orderBook(bookId, createBookDto);
        return book;
    }

    @Put('/stopOrder/:bookId')
    public async stopOrderBook(@Body() createBookDto: CreateBookDTO,
    @Param('bookId') bookId: number): Promise<Book> 
    {
        const book = await this.bookService.stopOrderBook(bookId, createBookDto);
        return book;
    }
}