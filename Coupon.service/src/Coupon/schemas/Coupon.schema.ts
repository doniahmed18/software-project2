
import * as mongoose from 'mongoose';

export const Couponschema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    }

});
