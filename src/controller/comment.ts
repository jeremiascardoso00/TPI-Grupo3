import bcrypt from 'bcrypt';
import {User} from '../models/user.ts';
import {Comment} from '../models/comment.js'
import {validate } from 'class-validator';
import jwt from 'jsonwebtoken';
import express, { Express, NextFunction, Request, Response } from 'express';

const JWT = process.env.JWT

const createOne = async(req: Request,res: Response)=>{    
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

}


export default {   
    createOne
};
