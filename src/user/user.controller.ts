import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
  
@Controller('user')
export class UserController 
{
    constructor(private userService: UserService) {}

    @Post('create')
    public async createUser(@Body() createUserDto: CreateUserDTO): Promise<User> 
    {
        const user = await this.userService.createUser(createUserDto);
        return user;
    }
  
    @Get('all')
    public async getUsers(): Promise<User[]> 
    {
        const users = await this.userService.getUsers();
        return users;
    }
  
    @Get('/:userId')
    public async getUser(@Param('userId') userId: number) 
    {
        const user = await this.userService.getUser(userId);
        return user;
    }

    @Get('/id/:userId')
    public async getUserWithBooks(@Param('userId') userId: number) 
    {
        const user = await this.userService.getUserWithBooks(userId);
        return user;
    }

    @Get('/isSub/:userId')
    public async isSubscribed(@Param('userId') userId: number)
    {
        const user = await this.userService.isSubscribed(userId);
        return user;
    }
  
    @Put('/edit/:userId')
    public async editUser(@Body() createUserDto: CreateUserDTO,
    @Param('userId') userId: number): Promise<User> 
    {
        const user = await this.userService.editUser(userId, createUserDto);
        return user;
    }

    @Put('/getSub/:userId')
    public async getSubscription(@Param('userId') userId: number): Promise<User> 
    {
        const user = await this.userService.getSubscription(userId);
        return user;
    }
  
    @Delete('/delete/:userId')
    public async deleteUser(@Param('userId') userId: number) 
    {
        const deletedUser = await this.userService.deleteUser(userId);
        return deletedUser;
    }
}
