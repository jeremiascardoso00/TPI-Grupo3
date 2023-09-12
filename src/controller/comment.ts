import bcrypt from 'bcrypt';
import {User} from '../models/user.ts';
import {Comment} from '../models/comment.js'
import {validate } from 'class-validator';
import jwt from 'jsonwebtoken';
import express, { Express, NextFunction, Request, Response } from 'express';

const JWT = "LautaroAllenAguero9685"

const createOne = async(req: Request,res: Response)=>{    
   
    var {comment} = req.body 
    // var {token} = req.cookies
    const JWT_TOKEN = req.header('Authorization');
    console.log('token',JWT_TOKEN)        

    try{
        if (JWT_TOKEN !== null && JWT_TOKEN !== undefined) {
            const {email} = jwt.verify(JWT_TOKEN,JWT) as jwt.JwtPayload
            const user = await User.findOne({email})        
            await Comment.create({
                content: comment, 
                author: user._id,
                authorName : user.name          
            })       
        } else  {
            await Comment.create({
                content: comment, 
                authorName : "anónimo"          
            })   
        }
      
        console.log('Comment created')        
        return res.status(200).send({
            status:'OK',
            message:'comment created'
        })
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
