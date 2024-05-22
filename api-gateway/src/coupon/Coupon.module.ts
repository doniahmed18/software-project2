import { Module } from '@nestjs/common';
import { CouponController } from './Coupon.controller';
import { CouponService } from './Coupon.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name:'COUPON_SERVICE',
        transport:Transport.KAFKA,
        options:{
          client:{
            clientId:'auth',
            brokers:['localhost:9092']
          },
          consumer:{
            groupId:'coupon-consumer',
          }
        }
      }
    ])
  ],
  controllers: [CouponController],
  providers: [CouponService]
})
export class CouponModule {}
