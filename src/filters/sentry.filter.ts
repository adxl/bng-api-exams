import { Catch, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import * as Sentry from '@sentry/node';

@Catch()
export class SentryFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(SentryFilter.name);

  catch(exception: unknown) {
    if (process.env.STAGE === 'production') {
      Sentry.captureException(exception);
    }

    if (exception instanceof RpcException) {
      this.logger.error(exception.getError().toString());
    }

    if (exception instanceof HttpException) {
      this.logger.error(exception.getResponse());
      throw new HttpException(exception.getResponse(), exception.getStatus());
    }
  }
}
