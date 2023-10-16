import bcrypt from 'bcrypt';
import {User} from '../models/user.ts';
import {Subject} from '../models/subjects.ts'
import {validate } from 'class-validator';
import jwt from 'jsonwebtoken';
import express, { Express, NextFunction, Request, Response } from 'express';

const JWT = "LautaroAllenAguero9685"

const getAll = async(req: Request,res: Response)=>{    
 
   
    try {  
        var subjects = await Subject.find({})        
        res.json(subjects)   
    } catch (error) {
        console.log(JSON.stringify(error))
        throw error;
    }

}


export default {   
    getAll
};
