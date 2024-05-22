import { Module } from '@nestjs/common';
import { CartController } from './Cart.controller';
import { CartService } from './Cart.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
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
    ])
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
