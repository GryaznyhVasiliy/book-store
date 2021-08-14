import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { CreateBookDTO } from './dto/create-book.dto';
import { BookRepository } from './book.repository';
import { log } from 'console';

@Injectable()
export class BookService 
{
    constructor(@InjectRepository(BookRepository) private bookRepository: BookRepository) {}

    public async createBook(createBookDto: CreateBookDTO): Promise<Book> 
    {
        return await this.bookRepository.createBook(createBookDto);
    }

    public async orderBook(bookId: number, createBookDto: CreateBookDTO): Promise<Book> 
    {
        const orderedBook = await this.bookRepository.findOne(bookId);
        if (!orderedBook) 
        {
            throw new NotFoundException('Book not found');
        }
        const { owner } = createBookDto;
        let users = await this.bookRepository
            .createQueryBuilder('book')
            .where('book.ownerId = :ownerId', { ownerId: owner })
            .getCount();
        if (users == 5){
            throw new NotFoundException('User allready has 5 books');
        }
        return this.bookRepository.orderBook(createBookDto, orderedBook);
    }

    public async stopOrderBook(bookId: number, createBookDto: CreateBookDTO): Promise<Book> 
    {
        const stopOrderedBook = await this.bookRepository.findOne(bookId);
        if (!stopOrderedBook) 
        {
            throw new NotFoundException('Book not found');
        }
        return this.bookRepository.stopOrderBook(createBookDto, stopOrderedBook);
    }
}
