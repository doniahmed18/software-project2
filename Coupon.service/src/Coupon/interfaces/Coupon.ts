
import { Document } from 'mongoose';

export interface Coupon extends Document {
   
   readonly name: String;
   readonly value: Number; 
  

}