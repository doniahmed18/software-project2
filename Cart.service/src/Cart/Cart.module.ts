import { Module } from '@nestjs/common';
import { CartController } from './Cart.controller';
import { CartService } from './Cart.service';
import { databaseProviders } from './database/database.providers';
import { ProductProviders } from './database/Cart.providers';
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
  controllers: [CartController],
  providers: [CartService, ...ProductProviders, ...databaseProviders, JwtStrategy],
  exports: [...databaseProviders],
})
export class CartModule {}
