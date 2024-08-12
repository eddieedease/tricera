import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = []; // This is a placeholder. In a real app, you'd use a database.

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  create(user: any) {
    this.users.push(user);
    return user;
  }
}