import { Module } from '@nestjs/common';
import { OrderController } from './Order.controller';
import { OrderService } from './Order.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name:'ORDER_SERVICE',
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
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
