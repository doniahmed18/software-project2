import mongoose from "mongoose";

export class CreateOrderDto{

    readonly products: [string, number][];
    readonly total: number;
    readonly status: string;
    readonly address: string;
    readonly Date: Date;
    readonly phone: string;
    readonly email: string;
    readonly paymentMethod: string;
    readonly UserID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      };




}