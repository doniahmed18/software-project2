import mongoose from "mongoose";

export class CreateWishlistDto{

    readonly products: [string, number][];
    readonly UserID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      };




}