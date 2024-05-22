import { Module } from '@nestjs/common';
import { FavItemsController } from './FavItems.controller';
import { FavItemsService } from './FavItemsservice';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name:'FAVITEMS_SERVICE',
        transport:Transport.KAFKA,
        options:{
          client:{
            clientId:'auth',
            brokers:['localhost:9092']
          },
          consumer:{
            groupId:'favItems-consumer',
          }
        }
      }
    ])
  ],
  controllers: [FavItemsController],
  providers: [FavItemsService]
})
export class FavItemsModule {}
