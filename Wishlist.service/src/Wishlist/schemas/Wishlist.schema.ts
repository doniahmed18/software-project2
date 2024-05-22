
import * as mongoose from 'mongoose';

export const Wishlistschema = new mongoose.Schema({

  UserID:mongoose.Schema.Types.ObjectId,
  products: [
    {
      id: { type: String, required: true }
    }
  ]

});
