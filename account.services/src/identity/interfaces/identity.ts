
import { Document } from 'mongoose';

export interface Identity extends Document {
   
   readonly username: String;
   readonly password: String;
   readonly First_Name: String;
   readonly Last_Name: String;
   readonly Email: String;
   readonly Phone_Number: String;
   readonly Company: String;
   readonly Address: String;

}