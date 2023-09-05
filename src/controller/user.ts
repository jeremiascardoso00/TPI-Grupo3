import bcrypt from 'bcrypt';
import {User, UserCreate, UserCreateAPI} from '../models/user.js';
import {validate } from 'class-validator';
import jwt from 'jsonwebtoken';
import express, { Express, NextFunction, Request, Response } from 'express';


const salt = 10;

const JWT = process.env.JWT

const verifyUserLogin = async (email: any,password: string | Buffer) => {
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
            JWT as jwt.Secret,
            { expiresIn: '2h'})            
            return {status:200 ,data : token}
        }
        return {status:'error',error:'invalid password'}
    }catch(err){
        console.log(err)
        return {status: 'error',error:'timed out'}
    }
}

const login = async(req:Request,res:Response)=>{

    const requestbody = new User(req.body); 

    const userNew = new UserCreateAPI();

    userNew.email = requestbody.email
    userNew.password = requestbody.password

    const {email,password} = req.body
    const response = await verifyUserLogin(email,password)
    if (response.status === 200) {        
        res.cookie('token',response.data,{maxAge: 2*60*80*1000, httpOnly: true,});        
    }if (response.status === 404){
        res.redirect('/register')
    } else {
        res.json(response)
    }
}

const register = async (req:any,res:Response, next:NextFunction )=> {
    try{
        console.info("test")

        const requestbody = new User(req.body); 

        const userNew = new UserCreateAPI();

        userNew.email = requestbody.email
        userNew.password = requestbody.password
        userNew.name = requestbody.name
        userNew.lastname = requestbody.lastname
        userNew.role = requestbody.role

        const errors = await validate(userNew);
        if (errors.length) {
            res.status(500).send(Error("validation error: invalid body"))
            throw new Error("validation error: invalid body")
        }

        const password = await bcrypt.hash(requestbody.password,salt)
    
        const userCreate: UserCreate = {
            email:requestbody.email,
            password:password,
            name:requestbody.name,
            lastname:requestbody.lastname,
            role:requestbody.role
            };

        await User.create(userCreate)
        
        //  res.redirect('/')
        return res.json();     

    }catch(err:any){
        // console.log(JSON.stringify(err))
        if(err.code === 11000){
            return res.status(500).send({
                status:'error',
                error:'Email already exist'
            })
        }
        throw err
    }
}

export default {   
    login,
    register
};
