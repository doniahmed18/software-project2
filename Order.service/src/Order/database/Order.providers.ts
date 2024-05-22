
import { Connection } from 'mongoose';
import { Orderschema } from '../schemas/Order.schema';

export const ProductProviders = [
  {
    provide: 'ORDER_MODEL',
    useFactory: (connection: Connection) => connection.model('Order', Orderschema),
    inject: ['DATABASE_CONNECTION'],
  },
];
