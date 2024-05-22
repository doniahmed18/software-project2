import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouponModule } from './Coupon/Coupon.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://doniaelgendy18:SP2doniaahmed@cluster0.2qvi61q.mongodb.net/',{
    dbName: 'SP2',
  }),
  //connect to mongo db
  CouponModule], // bcall el module el feh el apis 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
