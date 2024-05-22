import { Module } from '@nestjs/common';
import { WishlistController } from './Wishlist.controller';
import { WishlistService } from './Wishlistservice';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name:'WISHLIST_SERVICE',
        transport:Transport.KAFKA,
        options:{
          client:{
            clientId:'auth',
            brokers:['localhost:9092']
          },
          consumer:{
            groupId:'wishlist-consumer',
          }
        }
      }
    ])
  ],
  controllers: [WishlistController],
  providers: [WishlistService]
})
export class WishlistModule {}
