import bcrypt from 'bcrypt';
import {ReportMongo} from '../models/report.ts'
import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Subject } from '../models/subjects';

const JWT = "LautaroAllenAguero9685"

// const getAll = async(req: Request,res: Response)=>{    
 
   
//     try {  
//         var subjects = await Reports.find({})        
//         res.json(subjects)   
//     } catch (error) {
//         console.log(JSON.stringify(error))
//         throw error;
//     }

// }


const getReportsByUserIdAndSubjectId = async(req: Request,res: Response)=>{    
 
    try {  

        let subjectId = new ObjectId(req.params.cid)
        let studentId = new ObjectId(req.params.sid)


        var reports = await ReportMongo.find({ student: studentId, subject: subjectId })
        .populate('subject')
        .populate('student')
        res.json(reports)   
        return;
    } catch (error) {
        console.log(JSON.stringify(error))
        throw error;
    }
}

const create = async(req: Request,res: Response)=>{    
 
    try {  


        const requestbody = new ReportMongo(req.body); 

        // var reports = await Report.find({ student: studentId, subject: subjectId })
        // .populate('subject')
        // .populate('student')


        await ReportMongo.create(requestbody)
        res.json(requestbody)   
        return;
    } catch (error) {
        console.log(JSON.stringify(error))
        throw error;
    }
}


export default {   
    getReportsByUserIdAndSubjectId,
    create
};
function handleError(err: any) {
    throw new Error('Function not implemented.');
}

