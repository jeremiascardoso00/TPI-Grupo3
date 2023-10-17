import express from 'express';
import userController from '../controller/user.ts';
import commentController from '../controller/comment.ts';
import subjectController from '../controller/subject.ts';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import path from 'path';


const JWT = process.env.JWT

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const routes = express.Router();

const verifyToken =(token: any)=>{
    try {
        console.info("test")
        const verify = jwt.verify(token,JWT) as any;
        if(verify.type ==='user'){return true}
        else{return false};
    } catch (error) {
        console.log(error)
        console.log(JSON.stringify(error),"error");
        return false;
    }
}

routes.get('/',(req: any,res: any)=>{
    const {token} = req.cookies;
    if(verifyToken(token)){
        return res.sendFile(__dirname+'/views/home.html');
    }else{
        return res.sendFile(__dirname+'/views/login.html');
    }         
})

routes.get('/register',(req: any,res: any)=>{
    res.sendFile(__dirname+'/views/register.html')     
})

routes.get('/comments', commentController.getAll)
routes.post('/register', userController.register);
routes.post('/login', userController.login);
routes.post('/comment', commentController.createOne);
routes.get('/subjects', subjectController.getAll)
routes.get('/users', userController.getAll)
routes.get('/subjects/:sid', subjectController.getByStudentID)
routes.get('/teacher/:tid/students', subjectController.getTeacherStudentsByTeacherID)




routes.get('/', (req, res) => {
    res.send("What's up doc ?!");
});




// export default { router};