import * as mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema({
  UserID: mongoose.Schema.Types.ObjectId,
  products: [
    {
      id: { type: String, required: true },
      quantity: { type: Number },
      type: { type: String, required: true },
      startdate: { type: Date},
      enddate: { type: Date  },
      material: { type: String },
      color: { type: String },
      height: { type: String},
      width: { type: String  }
    }
  ]
});
