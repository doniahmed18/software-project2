import { Module } from '@nestjs/common';
import { ProfileController } from './Profile.controller';
import { ProfileService } from './Profile.service';
import { databaseProviders } from './database/database.providers';
import { ProfileProviders } from './database/Profile.providers';
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
  controllers: [ProfileController],
  providers: [ProfileService, ...ProfileProviders, ...databaseProviders, JwtStrategy],
  exports: [...databaseProviders],
})
export class ProfileModule {}
