import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Users } from '../../users.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Users => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);

export const GetRT = createParamDecorator(
  (_data, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return refreshToken;
  },
);
