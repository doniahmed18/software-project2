
import * as mongoose from 'mongoose';

export const TopOffersschema = new mongoose.Schema({

  TopOffersName: String,
  TopOffersImage: String,
  TopOffersPrice: Number,
  TopOffersSpecifications: String,
  TopOffersAvailability: String,
  TopOffersDescription: String,

});
