import bcrypt from 'bcrypt';
import {User} from '../models/user.ts';
import {Subject} from '../models/subjects.ts'
import {validate } from 'class-validator';
import jwt from 'jsonwebtoken';
import express, { Express, NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

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

const getByStudentID = async(req: Request,res: Response)=>{    
   
    try {  

        let studentId = new ObjectId(req.params.sid)

        var subjects = await Subject.find({
            students:new ObjectId(studentId)
        }).populate('professor')
        res.json(subjects)   
    } catch (error) {
        console.log(JSON.stringify(error))
        throw error;
    }

}

//returns all the subjects of the professor with the students
const getTeacherStudentsByTeacherID = async(req: Request,res: Response)=>{    
 
    try {  

        let professorId = new ObjectId(req.params.tid)

        var subjects = await Subject.find({ professor: professorId })
        .populate('students');
        res.json(subjects)   
    } catch (error) {
        console.log(JSON.stringify(error))
        throw error;
    }
}

const getStudentsBySubjectID = async(req: Request,res: Response)=>{    
 
    try {  

        let subjectId = new ObjectId(req.params.cid)

        var subjects = await Subject.findById(subjectId)
        .populate('students');
        res.json(subjects)   


    } catch (error) {
        console.log(JSON.stringify(error))
        throw error;
    }
}

export default {   
    getAll,
    getByStudentID,
    getTeacherStudentsByTeacherID,
    getStudentsBySubjectID
};
function handleError(err: any) {
    throw new Error('Function not implemented.');
}

