import { Module } from '@nestjs/common';
import { TopOffersController } from './TopOffers.controller';
import { TopOffersService } from './TopOffers.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name:'TOPOFFERS_SERVICE',
        transport:Transport.KAFKA,
        options:{
          client:{
            clientId:'auth',
            brokers:['localhost:9092']
          },
          consumer:{
            groupId:'topOffers-consumer',
          }
        }
      }
    ])
  ],
  controllers: [TopOffersController],
  providers: [TopOffersService]
})
export class TopOffersModule {}
