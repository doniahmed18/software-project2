import mongoose from "mongoose";

export class CreateCartDto{

    readonly products: [string, number][];
    readonly UserID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      };




}