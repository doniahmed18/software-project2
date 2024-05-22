
import { Connection } from 'mongoose';
import { CartSchema } from '../schemas/Cart.schema';

export const ProductProviders = [
  {
    provide: 'CART_MODEL',
    useFactory: (connection: Connection) => connection.model('Cart', CartSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
