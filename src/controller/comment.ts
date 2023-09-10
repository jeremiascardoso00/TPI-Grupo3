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
        const {email} = jwt.verify(token,JWT)
        const user = await User.findOne({email})        
        await Comment.create({
            content: comment, 
            author: user._id,
            authorName : user.name          
        })       
        console.log('Comment created')        
        res.redirect('/')
    }catch(err){        
        throw err
    }

}

const getAll = async(req: Request,res: Response)=>{    
   
    try {        
        var comments = await Comment.find({})        
        res.json(comments)    
    } catch (error) {
        console.log(JSON.stringify(error))
        throw error;
    }

}


export default {   
    createOne,
    getAll
};
