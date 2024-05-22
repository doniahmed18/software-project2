import { Module } from '@nestjs/common';
import { TopOffersController } from './TopOffers.controller';
import { TopOffersService } from './TopOffers.service';
import { databaseProviders } from './database/database.providers';
import { TopOffersProviders } from './database/TopOffers.providers';
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
  controllers: [TopOffersController],
  providers: [TopOffersService, ...TopOffersProviders, ...databaseProviders, JwtStrategy],
  exports: [...databaseProviders],
})
export class TopOffersModule {}
