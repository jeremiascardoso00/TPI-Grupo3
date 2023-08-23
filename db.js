import mongoose, { connect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

export const initializeDb = () => {
    const run = async () => {
        await mongoose.connect(process.env.MONGODB_URI)
        .then (console.log("Connected to mongo"))
    }
    run().catch(err=>console.log(err));

}

