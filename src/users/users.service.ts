import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Carts } from 'src/carts/carts.entity';

import { RefreshDto } from './dto/refresh.dto';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtPayLoad, RtPayLoad } from './jwt.payload';
import { Users } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<Users> {
    try {
      const { email, password, country, street_address, city, state, phone } =
        signUpDto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = this.usersRepository.create({
        email,
        city,
        state,
        phone,
        country,
        street_address,
        password: hashedPassword,
      });
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string; user: Users }> {
    const { email, password } = signInDto;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Please check your login detail');
    }

    const matchesPassword = await bcrypt.compare(password, user.password);

    if (!matchesPassword) {
      throw new UnauthorizedException('Please check your password');
    }
    const payload: JwtPayLoad = { email };
    const accessToken: string = await this.jwtService.sign(payload, {
      secret: this.config.get<string>('AT_JWT_SECRET'),
      expiresIn: 60 * 60,
    });
    const RtPayLoad: RtPayLoad = { email, id: user.id };
    const refreshToken: string = await this.jwtService.sign(RtPayLoad, {
      secret: this.config.get<string>('RT_JWT_SECRET'),
      expiresIn: 60 * 60 * 24 * 7,
    });
    const salt = await bcrypt.genSalt();
    const hashedRTToken = await bcrypt.hash(refreshToken, salt);
    user.hashedRT = hashedRTToken;
    await this.usersRepository.save(user);

    return { accessToken, refreshToken, user };
  }

  async logOut(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });
    user.hashedRT = null;
    await this.usersRepository.save(user);
  }

  async refreshTokens(
    refreshDto: RefreshDto,
  ): Promise<{ accessToken: string; rt: string }> {
    const { email, refreshToken } = refreshDto;
    const userRefresh = await this.usersRepository.findOne({
      where: { email },
    });

    const rtMatches = await bcrypt.compare(refreshToken, userRefresh.hashedRT);
    if (!rtMatches) throw new ForbiddenException('Access Denied');
    const payload: JwtPayLoad = { email };
    const accessToken: string = await this.jwtService.sign(payload, {
      secret: this.config.get<string>('AT_JWT_SECRET'),
      expiresIn: 60 * 60,
    });

    const RtPayLoad: RtPayLoad = { email, id: userRefresh.id };
    const rt: string = await this.jwtService.sign(RtPayLoad, {
      secret: this.config.get<string>('RT_JWT_SECRET'),
      expiresIn: 60 * 60 * 24 * 7,
    });
    const salt = await bcrypt.genSalt();
    const hashedRTToken = await bcrypt.hash(rt, salt);

    userRefresh.hashedRT = hashedRTToken;
    await this.usersRepository.save(userRefresh);
    return { accessToken, rt };
  }

  async updateCartUser(user: Users, cart: Carts): Promise<void> {
    const userUpdate = await this.usersRepository.findOne({
      where: { id: user.id },
    });
    userUpdate.cart = cart;
    await this.usersRepository.save(userUpdate);
  }
}
