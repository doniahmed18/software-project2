import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartService } from 'src/cart/Cart.service';
import { OrderService } from 'src/order/Order.service';
import { WishlistService } from 'src/Wishlist/Wishlistservice';
import { FavItemsService } from 'src/FavItems/FavItemsservice';

@Module({
  imports: [
    ClientsModule.register([
      {
        name:'ACC_SERVICE',
        transport:Transport.KAFKA,
        options:{
          client:{
            clientId:'auth',
            brokers:['localhost:9092']
          },
          consumer:{
            groupId:'account-consumer',
          }
        }
      },
      {
        name:'CART_SERVICE',
        transport:Transport.KAFKA,
        options:{
          client:{
            clientId:'auth',
            brokers:['localhost:9092']
          },
          consumer:{
            groupId:'cart-consumer',
          }
        }
      }
      ,
      {
        name:'ORDER_SERVICE',
        transport:Transport.KAFKA,
        options:{
          client:{
            clientId:'auth',
            brokers:['localhost:9092']
          },
          consumer:{
            groupId:'order-consumer',
          }
        }
      }
      ,
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
      },
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
  controllers: [AccountController],
  providers: [AccountService , CartService , OrderService , WishlistService , FavItemsService]
})
export class AccountModule {}
