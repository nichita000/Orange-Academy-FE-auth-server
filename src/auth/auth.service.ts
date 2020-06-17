import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService, User } from '../users/users.service';

type LoginResponse = { accessToken: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const { password: _, ...validatedUser } = user;
      return validatedUser;
    }

    return null;
  }

  async login({ userId, username }: User): Promise<LoginResponse> {
    const payload: Pick<User, 'userId' | 'username'> = { userId, username };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
