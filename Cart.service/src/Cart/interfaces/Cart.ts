import mongoose, { Document } from 'mongoose';

export interface Cart extends Document {
  readonly UserID: mongoose.Types.ObjectId;
  readonly products: Array<{ id: string; quantity: number ;type:string;startdate:Date;enddate:Date;color:string;material:string;width:string;height:string }>;
}
