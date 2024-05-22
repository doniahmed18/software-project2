
import { Document } from 'mongoose';

export interface FavItems extends Document {
   
   readonly UserID: String;
   readonly products: Array<{ id: string }>;

}