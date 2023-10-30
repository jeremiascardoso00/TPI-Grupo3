import express from 'express';
import userController from '../controller/user.ts';
import commentController from '../controller/comment.ts';
import subjectController from '../controller/subject.ts';
import reportController from '../controller/reports.ts';

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
routes.get('/subjects/:cid', subjectController.getByStudentID)
routes.get('/teacher/:tid/students', subjectController.getTeacherStudentsByTeacherID)
routes.get('/reports/subjects/:cid/students/:sid', reportController.getReportsByUserIdAndSubjectId)

// routes.post('/payment', paymentController.createPayment)
// Para registrar los pagos de los servicios.
// routes.get('/payment/:pid', paymentController.getPaymentByID)
// Para obtener detalles de un pago específico.
routes.get('/subjects/:cid/students', subjectController.getStudentsBySubjectID)
// Para obtener un listado de alumnos por curso.
// routes.get('/teacher/:tid/subjects', teacherController.getTeacherSubjects)
// Para obtener materias del profesor con sus estudiantes
// routes.get('/students/unpaid', studentController.getStudentsWithUnpaidFees)
// Para obtener un listado de alumnos con cuotas impagas.
// routes.get('/income', incomeController.getIncomeInRange) 
// Para obtener un informe de ingresos en un rango de fechas.
// routes.post('/user/role', userController.assignRole)
// Para asignar roles a los usuarios.


routes.get('/', (req, res) => {
    res.send("What's up doc ?!");
});




// export default { router};