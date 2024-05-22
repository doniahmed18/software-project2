import { Module } from '@nestjs/common';
import { ProfileController } from './Profile.controller';
import { ProfileService } from './Profile.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name:'PROFILE_SERVICE',
        transport:Transport.KAFKA,
        options:{
          client:{
            clientId:'auth',
            brokers:['localhost:9092']
          },
          consumer:{
            groupId:'profile-consumer',
          }
        }
      }
    ])
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
