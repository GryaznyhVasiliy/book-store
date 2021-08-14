import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> 
{
    public async createUser(createUserDto: CreateUserDTO): Promise<User> 
    {
        const { name, subscribe } = createUserDto;

        const user = new User();
        user.name = name;
        user.subscribe = subscribe;

        await user.save();
        return user;
    }

    public async editUser(createUserDto: CreateUserDTO, editedUser: User): Promise<User> 
    {
        const { name, subscribe } = createUserDto;

        editedUser.name = name;
        editedUser.subscribe = subscribe;
        await editedUser.save();

        return editedUser;
    }

    public async getSubscription(subscribedUser: User): Promise<User> 
    {
        subscribedUser.subscribe = true;
        await subscribedUser.save();

        return subscribedUser;
    }
}