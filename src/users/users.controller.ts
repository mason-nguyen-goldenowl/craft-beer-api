import { Body, Controller, Post } from '@nestjs/common';

import { GetRT } from './common/decorator/get-user.decorator';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtPayLoad } from './jwt.payload';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.userService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.userService.signIn(signInDto);
  }

  @Post('/logout')
  logOut(@Body() email: string): Promise<void> {
    return this.userService.logOut(email);
  }

  @Post('/refresh')
  refreshTokens(
    @Body() JwtPayLoad: JwtPayLoad,
    @GetRT() rt: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.userService.refreshTokens(JwtPayLoad, rt);
  }
}
