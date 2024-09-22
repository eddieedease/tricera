import { Injectable } from '@nestjs/common';
import { User } from './users.interface';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  create(createUserDto: CreateUserDto) {
    const newUser = { ...createUserDto, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  }
}