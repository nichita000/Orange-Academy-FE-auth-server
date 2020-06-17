import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'nichita.ursu',
        firstName: 'Nichita',
        lastName: 'Ursu',
        password: 'nichita.password',
      },
      {
        userId: 2,
        username: 'john.doe',
        firstName: 'John',
        lastName: 'Doe',
        password: 'john.password',
      },
      {
        userId: 3,
        username: 'test.user',
        firstName: 'Test',
        lastName: 'User',
        password: 'test.password',
      },
    ];
  }

  async findOne(username: string): Promise<User> {
    return this.users.find((user: User) => user.username === username);
  }

  async find(): Promise<User[]> {
    return this.users.map(({ password, ...user }: User) => user);
  }
}
