
import { Document } from 'mongoose';

export interface Product extends Document {
   
   readonly ProductName: String;
   readonly ProductDescription: String; 
   readonly ProductImage: String;
   readonly ProductPrice: String;
   readonly ProductSpecifications: String;
   readonly ProductAvailability: String;
   readonly ProductsReview: Array<{ id: string; review: string ,rating:Number}>;


}