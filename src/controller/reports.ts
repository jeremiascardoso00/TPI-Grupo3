import bcrypt from 'bcrypt';
import {Report} from '../models/report.ts'
import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

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


        var reports = await Report.findById({ student: studentId, subject: subjectId })
        .populate('subject')
        res.json(reports)   
        return;
    } catch (error) {
        console.log(JSON.stringify(error))
        throw error;
    }
}


export default {   
    getReportsByUserIdAndSubjectId
};
function handleError(err: any) {
    throw new Error('Function not implemented.');
}

