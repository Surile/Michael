import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('login')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async getTokenUser(@Body() params) {
    return await this.adminService.login(params.username, params.password);
  }
}
