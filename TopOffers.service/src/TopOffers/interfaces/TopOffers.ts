
import { Document } from 'mongoose';

export interface TopOffers extends Document {
   
   readonly TopOffersName: String;
   readonly TopOffersDescription: String; 
   readonly TopOffersImage: String;
   readonly TopOffersPrice: String;
   readonly TopOffersSpecifications: String;
   readonly TopOffersAvailability: String;

}