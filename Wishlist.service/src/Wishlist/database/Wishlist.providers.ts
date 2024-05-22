
import { Connection } from 'mongoose';
import { Wishlistschema } from '../schemas/Wishlist.schema';

export const ProductProviders = [
  {
    provide: 'WISHLIST_MODEL',
    useFactory: (connection: Connection) => connection.model('Wishlist', Wishlistschema),
    inject: ['DATABASE_CONNECTION'],
  },
];
