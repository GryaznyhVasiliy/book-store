import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService 
{
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

    public async createUser(createUserDto: CreateUserDTO,): Promise<User> 
    {
        return await this.userRepository.createUser(createUserDto);
    }

    public async getUsers(): Promise<User[]> 
    {
        return await this.userRepository.find();
    }

    public async getUser(userId: number): Promise<User> 
    {
        const foundUser = await this.userRepository.findOne(userId);
        if (!foundUser) 
        {
            throw new NotFoundException('User not found');
        }
        return foundUser;
    }

    public async getUserWithBooks(userId: number) 
    {
        const foundUser = await this.userRepository.findOne(userId);
        if (!foundUser) 
        {
            throw new NotFoundException('User not found');
        }
        const users = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.books', 'book')
            .where('user.id = :id', { id: userId })
            .getOne();
        return users
    }

    public async editUser(userId: number, createUserDto: CreateUserDTO): Promise<User> 
    {
        const editedUser = await this.userRepository.findOne(userId);
        if (!editedUser) 
        {
            throw new NotFoundException('User not found');
        }
        return this.userRepository.editUser(createUserDto, editedUser);
    }

    public async getSubscription(userId: number): Promise<User> 
    {
        const subscribedUser = await this.userRepository.findOne(userId);
        if (!subscribedUser) 
        {
            throw new NotFoundException('User not found');
        }
        return this.userRepository.getSubscription(subscribedUser);
    }


    public async isSubscribed(userId: number): Promise<Boolean> {
        const foundUser = await this.userRepository.findOne(userId);
        if (!foundUser) 
        {
            throw new NotFoundException('User not found');
        }
        if (foundUser.subscribe)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public async deleteUser(userId: number): Promise<void> {
        await this.userRepository.delete(userId);
    }
}