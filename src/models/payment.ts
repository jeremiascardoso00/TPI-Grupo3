import mongoose, { Schema } from "mongoose";

interface IBill extends Document {
    date: Date;
    customer: any;
    customerName: string;
    total: number;
  }
  
interface IPayment extends Document {
    amount: number;
    method: string;
    bill: IBill;
    billNumber: string;
    createdAt: Date;
}

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    method: {
        type: String
    },
    bill: {
        type: Schema.Types.ObjectId,
        ref: 'Bill',
        required: false
    },
    billNumber: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema);