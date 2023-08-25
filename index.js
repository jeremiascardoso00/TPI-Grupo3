import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import {User} from './models/user.js';
import {Comment} from './models/comment.js'
import {initializeDb} from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

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

const verifyUserLogin = async (email,password) => {
    try{
        const user = await User.findOne({email}).lean();        
        console.log(user)        
        if(!user) {                        
            return {status: 404 ,error:'User not found'}
        }
        if(await bcrypt.compare(password,user.password)){
            var token = jwt.sign({
                id: user._id,
                email: user.email,
                type: 'user'
            },
            JWT,
            { expiresIn: '2h'})            
            return {status:200 ,data : token}
        }
        return {status:'error',error:'invalid password'}
    }catch(err){
        console.log(err)
        return {status: 'error',error:'timed out'}
    }
}

const verifyToken =(token)=>{
    try {
        const verify = jwt.verify(token,JWT);
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

app.post('/register', async (req,res)=>{
    const {email,password:plainTextPassword,name,lastname,role} = req.body;
    const password = await bcrypt.hash(plainTextPassword,salt)
    try{
        await User.create({
            email,
            password,
            name,
            lastname,
            role
        })
        return res.redirect('/')
    }catch(err){
        console.log(JSON.stringify(err))
        if(err.code === 11000){
            return res.send({
                status:'error',
                error:'Email already exist'
            })
        }
        throw err
    }
})

app.post('/login',async(req,res)=>{
    const {email,password} = req.body
    const response = await verifyUserLogin(email,password)
    if (response.status === 200) {        
        res.cookie('token',response.data,{maxAge: 2*60*80*1000, httpOnly: true,});        
    }if (response.status === 404){
        res.redirect('/register')
    } else {
        res.json(response)
    }
})

app.get('/comment',(req,res)=>{
    res.sendFile(__dirname+'/views/comment.html')     
})

app.post('/comment',async(req,res)=>{    
    var {comment} = req.body 
    var {token} = req.cookies
          
    try{
        const {email} = jwt.verify(token,JWT)
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
    console.log('App Listening on port' + process.env.PORT)
})