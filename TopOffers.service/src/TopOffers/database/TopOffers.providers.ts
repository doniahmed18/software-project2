
import { Connection } from 'mongoose';
import { TopOffersschema } from '../schemas/TopOffers.schema';

export const TopOffersProviders = [
  {
    provide: 'TOPOFFERS_MODEL',
    useFactory: (connection: Connection) => connection.model('TopOffers', TopOffersschema),
    inject: ['DATABASE_CONNECTION'],
  },
];
