
import { Connection } from 'mongoose';
import { Couponschema } from '../schemas/Coupon.schema';

export const CouponProviders = [
  {
    provide: 'COUPON_MODEL',
    useFactory: (connection: Connection) => connection.model('coupon', Couponschema),
    inject: ['DATABASE_CONNECTION'],
  },
];
