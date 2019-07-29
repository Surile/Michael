import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtServer: JwtService,
  ) {}

  async createToken(username: string, password: string): Promise<any> {
    const user: JwtPayload = {
      username,
      password,
    };

    console.log('user', user);

    return {
      expiresIn: 3600,
      accessToken: this.jwtServer.sign(user),
    };
  }

  async login(username: string, password: string) {
    const user = await this.adminRepository.findOne({ username });

    if (!user) {
      return {
        message: '账号不正确',
      };
    }

    if (user && user.password === password) {
      return this.createToken(user.username, user.password);
    } else {
      return {
        message: '密码不正确',
      };
    }
  }

  async validateUser(name: string) {
    return await this.adminRepository.findOne({ username: name });
  }
}
