import { Module } from '@nestjs/common';
import { ProductController } from './Product.controller';
import { ProductService } from './Product.service';
import { databaseProviders } from './database/database.providers';
import { ProductProviders } from './database/Products.providers';
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
  controllers: [ProductController],
  providers: [ProductService, ...ProductProviders, ...databaseProviders, JwtStrategy],
  exports: [...databaseProviders],
})
export class ProductModule {}
