import { Module } from '@nestjs/common';
import { CouponController } from './Coupon.controller';
import { CouponService } from './Coupon.service';
import { databaseProviders } from './database/database.providers';
import { CouponProviders } from './database/Coupon.providers';
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
  controllers: [CouponController],
  providers: [CouponService, ...CouponProviders, ...databaseProviders, JwtStrategy],
  exports: [...databaseProviders],
})
export class CouponModule {}
