
import * as mongoose from 'mongoose';

export const Profileschema = new mongoose.Schema({


    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    First_Name: {
        type: String,
        required: true,
    },
    Last_Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Phone_Number: {
        type: String,
        required: true,
    },
    Company: {
        type: String,
        required: true,
    },
    Address: {
        type: Array,
        required: true,
    },
    Payment: [
        {
            type: { type: String, required: true },
            name: { type: String, required: true },
            number: { type: String, required: true },
            expiry: { type: String, required: true },
            cvv: { type: String, required: true },
            account :{type: String, required: true},
            accounttype :{type: String, required: true}
        }
      ]

});
