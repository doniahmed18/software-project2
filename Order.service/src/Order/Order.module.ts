import { Module } from '@nestjs/common';
import { OrderController } from './Order.controller';
import { OrderService } from './Order.service';
import { databaseProviders } from './database/database.providers';
import { ProductProviders } from './database/Order.providers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret:'secretKey_YoucANWritewhateveryoulike',
      signOptions:{expiresIn:'10000s'},
    })
  ],
  controllers: [OrderController],
  providers: [OrderService, ...ProductProviders, ...databaseProviders, JwtStrategy],
  exports: [...databaseProviders],
})
export class OrderModule {}
