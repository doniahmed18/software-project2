
import { Document } from 'mongoose';

export interface Order extends Document {
   
   readonly UserID: String;
   readonly total: number;
   readonly status: string;
   readonly address: string;
   readonly phone: string;
   readonly email: string;
   readonly products: Array<{ id: string; quantity: number ;type:string;startdate:Date;enddate:Date;color:string;material:string;width:string;height:string }>;

}