import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

import { GetRT } from './common/decorator/get-user.decorator';
import { RefreshDto } from './dto/refresh.dto';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtPayLoad } from './jwt.payload';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  @ApiCreatedResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.userService.signUp(signUpDto);
  }

  @Post('/signin')
  @ApiCreatedResponse({
    status: 200,
    description: 'Sign in successful.',
  })
  signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.userService.signIn(signInDto);
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  @ApiCreatedResponse({
    status: 200,
    description: 'You have been log out',
  })
  logOut(@Body() email: string): Promise<void> {
    return this.userService.logOut(email);
  }

  @Post('/refresh')
  @ApiBearerAuth('authorization')
  @ApiBody({ type: RefreshDto })
  @ApiCreatedResponse({
    status: 200,
    description: 'You have gotten new tokens',
  })
  refreshTokens(
    @Body() JwtPayLoad: JwtPayLoad,
    @GetRT() rt: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.userService.refreshTokens(JwtPayLoad, rt);
  }
}
