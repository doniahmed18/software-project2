import { Module } from '@nestjs/common';
import { FavItemsController } from './FavItems.controller';
import { FavItemsService } from './FavItems.service';
import { databaseProviders } from './database/database.providers';
import { ProductProviders } from './database/FavItems.providers';
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
  controllers: [FavItemsController],
  providers: [FavItemsService, ...ProductProviders, ...databaseProviders, JwtStrategy],
  exports: [...databaseProviders],
})
export class FavItemsModule {}
