import dotenv from 'dotenv';
import express, {request} from 'express';
import {mongoose} from 'mongoose';
import {MongoClient, ServerApiVersion} from 'mongodb'
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

dotenv.config();

const run = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then (console.log("Connected to DDBB"))
}
run().catch(err=>console.log(err));

//MIDLEWARES

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.get('/',(req,res)=>{
   res.send("Hello World")
   console.log(mongoose.connection.readyState) 
})

app.listen(3000, () => {
    console.log('App Listening on port 3000')
})