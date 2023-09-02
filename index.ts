import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import {User} from './models/user.ts';
import {Comment} from './models/comment.js'
import {initializeDb} from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import  { login, register }  from  './controller/user.ts';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
const JWT = process.env.JWT

app.use(cors());

dotenv.config();

const salt = 10;

let actualUser;

initializeDb();

//MIDLEWARES
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());



const verifyToken =(token: any)=>{
    try {
        const verify = jwt.verify(token,JWT) as any;
        if(verify.type ==='user'){return true}
        else{return false};
    } catch (error) {
        console.log(JSON.stringify(error),"error");
        return false;
    }
}


app.get('/',(req,res)=>{
    const {token} = req.cookies;
    if(verifyToken(token)){
        return res.sendFile(__dirname+'/views/home.html');
    }else{
        return res.sendFile(__dirname+'/views/login.html');
    }         
})

app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/views/register.html')     
})

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/views/login.html')     
})

app.post('/register', register)

app.post('/login',login)

app.get('/comment',(req,res)=>{
    res.sendFile(__dirname+'/views/comment.html')     
})

app.post('/comment',async(req,res)=>{    
    var {comment} = req.body 
    var {token} = req.cookies
          
    try{
        const {email} = jwt.verify(token,JWT)  as any;
        const user = await User.findOne({email})        
        await Comment.create({
            content: comment, 
            author: user._id          
        })       
        console.log('Comment created')        
        res.redirect('/')
    }catch(err){        
        throw err
    }

})

app.listen(process.env.PORT || 3000 , () => {
    console.log('App Listening on port: ' + process.env.PORT)
})