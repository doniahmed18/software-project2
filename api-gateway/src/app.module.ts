import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { ProductModule } from './Products/Product.module';
import {WishlistModule} from './Wishlist/Wishlist.module';
import { ProfileModule } from './profile/Profile.module';
import { CartModule } from './cart/Cart.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/Order.module';
import { FavItemsModule } from './FavItems/FavItems.module';
import { TopOffersModule } from './TopOffers/TopOffers.module';
import {CouponModule} from './coupon/coupon.module';
@Module({
  imports: [
    // connection el kafka
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
      }
      ,
      {
        name:'PRODUCT_SERVICE',
        transport:Transport.KAFKA,
        options:{
          client:{
            clientId:'auth',
            brokers:['localhost:9092']
          },
          consumer:{
            groupId:'product-consumer',
          }
        }
      }
      ,
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
      }
      ,
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
      },
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
      },
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
    //
  ,AccountModule,ProductModule ,CartModule ,OrderModule,WishlistModule ,ProfileModule ,FavItemsModule ,TopOffersModule ,CouponModule], // bcall el module el feh el APIs bta3t el account
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
