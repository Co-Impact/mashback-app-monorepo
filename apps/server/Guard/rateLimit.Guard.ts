import { Inject, Injectable } from '@nestjs/common';
import {
  ThrottlerException,
  ThrottlerGuard,
  ThrottlerStorage,
} from '@nestjs/throttler';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RateLimitsGuard extends ThrottlerGuard {
  constructor(
    @Inject(Reflector)
    protected override reflector: Reflector,
    @Inject(ThrottlerStorage)
    protected storage: ThrottlerStorage,
  ) {
    super(
      [
        {
          ttl: 60000,
          limit: 20,
        },
      ],
      storage,
      reflector,
    );
  }

  protected override throwThrottlingException(): Promise<void> {
    throw new ThrottlerException('Too many requests, please try again later.');
  }
}
