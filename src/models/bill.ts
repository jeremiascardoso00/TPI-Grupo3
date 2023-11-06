import mongoose, { Schema } from "mongoose";

const billSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    customerName: {
        type: String
    },
    total: {
        type: Number
    }
})

export const Bill = mongoose.model('Bill', billSchema);