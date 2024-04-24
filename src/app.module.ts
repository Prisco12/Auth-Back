import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'),UsersModule, AuthModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users');
  }
}
