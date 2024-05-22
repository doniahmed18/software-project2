
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    // link el db
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://doniaelgendy18:SP2doniaahmed@cluster0.2qvi61q.mongodb.net/'),//databasename
    
  },
];
