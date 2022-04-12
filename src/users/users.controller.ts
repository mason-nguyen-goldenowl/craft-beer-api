import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

import { RefreshDto } from './dto/refresh.dto';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signup.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  @ApiCreatedResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  signUp(@Body() signUpDto: SignUpDto): Promise<Users> {
    return this.userService.signUp(signUpDto);
  }

  @Post('/signin')
  @ApiCreatedResponse({
    status: 200,
    description: 'Sign in successful.',
  })
  signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string; user: Users }> {
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
  @ApiBody({ type: RefreshDto })
  @ApiCreatedResponse({
    status: 200,
    description: 'You have gotten new tokens',
  })
  refreshTokens(
    @Body() refreshDto: RefreshDto,
  ): Promise<{ accessToken: string; rt: string }> {
    return this.userService.refreshTokens(refreshDto);
  }
}
