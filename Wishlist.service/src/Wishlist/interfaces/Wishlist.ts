
import { Document } from 'mongoose';

export interface Wishlist extends Document {
   
   readonly UserID: String;
   readonly products: Array<{ id: string }>;

}