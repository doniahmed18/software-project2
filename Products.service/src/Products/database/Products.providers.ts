
import { Connection } from 'mongoose';
import { Productschema } from '../schemas/Product.schema';

export const ProductProviders = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (connection: Connection) => connection.model('Products', Productschema),
    inject: ['DATABASE_CONNECTION'],
  },
];
