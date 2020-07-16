import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ChangePasswordService } from '../change-password/change-password.service';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from './change-password.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api/auth/change-password')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @Post()
  public async login(@Res() res, @Body() user: ChangePasswordDto): Promise<any> {
    try {
      await this.changePasswordService.changePassword(user);

      return res.status(HttpStatus.OK).json({
        message: 'Request Change Password Successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Change password failed!',
        status: 400,
      });
    }
  }
}
