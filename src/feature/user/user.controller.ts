import {
  Controller,
  Get,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiErrorCode } from '../../core/status/api-error-code.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('jwt'))
  async getAllUser(@Res() res): Promise<object> {
    return res.status(HttpStatus.OK).send({
      errorCode: ApiErrorCode.SUCCESS,
      message: '请求成功',
      data: await this.userService.getAllUser(),
    });
  }
}
