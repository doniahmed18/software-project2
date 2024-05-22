
import * as mongoose from 'mongoose';

export const Productschema = new mongoose.Schema({

  ProductName: String,
  ProductImage: String,
  ProductPrice: Number,
  ProductSpecifications: String,
  ProductAvailability: String,
  ProductDescription: String,
  ProductsReview: [
    {
      id: { type: String, required: true },
      review: { type: String, required: true },
      rating: { type: Number, required: true }
    }
  ]

});
