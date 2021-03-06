import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { CreateBookDTO } from './dto/create-book.dto';
import { BookRepository } from './book.repository';
import { IsNull, Not } from 'typeorm';

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

        if (users == 5)
        {
            throw new NotFoundException('User allready has 5 books');
        }

        let owners = await this.bookRepository.findOne({
            where: {
                id: bookId,
                owner: Not(IsNull())
            }
        });
        if(owners)
        {
            throw new NotFoundException('Book has allready been taken');
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

        const { owner } = createBookDto;
        let book = await this.bookRepository
            .createQueryBuilder('book')
            .where('book.ownerId = :ownerId', { ownerId: owner })
            .andWhere('book.id = :id', {id: bookId })
            .getCount();

        if(!book)
        {
            throw new NotFoundException('User doesnt own this book');
        }

        return this.bookRepository.stopOrderBook(createBookDto, stopOrderedBook);
    }
}
