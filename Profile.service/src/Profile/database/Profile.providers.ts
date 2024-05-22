
import { Connection } from 'mongoose';
import { Profileschema } from '../schemas/Profile.schema';

export const ProfileProviders = [
  {
    provide: 'PROFILE_MODEL',
    useFactory: (connection: Connection) => connection.model('users', Profileschema),
    inject: ['DATABASE_CONNECTION'],
  },
];
