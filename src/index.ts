// import dotenv from 'dotenv';
// import express, { Express } from 'express';

// import jwt from 'jsonwebtoken';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import bcrypt from 'bcrypt';
// import bodyParser from 'body-parser';
// import {User} from './models/user.ts';
// import {Comment} from './models/comment.js'
// import {initializeDb} from './db.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import routes from './routes/routes.ts';
// // import  { login, register }  from  './controller/user.ts';

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

// const app: Express = express();
// const JWT = process.env.JWT

// app.use(cors());

// const salt = 10;

// let actualUser;

// // "start": "ts-node-esm --esm index.ts"


// initializeDb();

// //MIDLEWARES
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.json());
// app.use(cookieParser());

// /** Takes care of JSON data */
// app.use(express.json());

// /** Error handling */
// app.use((req, res, next) => {
//     const error = new Error('not found');
//     return res.status(404).json({
//         message: error.message
//     });
// });

// const verifyToken =(token: any)=>{
//     try {
//         console.info("test")
//         const verify = jwt.verify(token,JWT) as any;
//         if(verify.type ==='user'){return true}
//         else{return false};
//     } catch (error) {
//         console.log(error)
//         // console.log(JSON.stringify(error),"error");
//         return false;
//     }
// }

// app.use('/', routes.router);



// app.get('/',(req: any,res: any)=>{
//     const {token} = req.cookies;
//     if(verifyToken(token)){
//         return res.sendFile(__dirname+'/views/home.html');
//     }else{
//         return res.sendFile(__dirname+'/views/login.html');
//     }         
// })

// app.get('/register',(req: any,res: any)=>{
//     console.info("test")

//     res.sendFile(__dirname+'/views/register.html')     
// })

// app.get('/login',(req: any,res: any)=>{
//     res.sendFile(__dirname+'/views/login.html')     
// })

// // app.post('/register', register)

// // app.post('/login',login)

// app.get('/comment',(req: any,res: any)=>{
//     res.sendFile(__dirname+'/views/comment.html')     
// })

// app.post('/comment',async(req: any,res: any)=>{    
//     var {comment} = req.body 
//     var {token} = req.cookies      
//     try{
//         const {email} = jwt.verify(token,JWT)  as any;
//         const user = await User.findOne({email})        
//         await Comment.create({
//             content: comment, 
//             author: user._id          
//         })       
//         console.log('Comment created')        
//         res.redirect('/')
//     }catch(err){        
//         throw err
//     }

// })

// app.listen(process.env.PORT || 3000 , () => {
//     console.log('App Listening on port: ' + process.env.PORT)
// })


/** source/server.ts */
import http from 'http';
import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import {User} from './models/user.ts';
import {Comment} from './models/comment.js'
import {routes} from './routes/routes';

import { initializeDb } from './db';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);


const JWT = process.env.JWT

initializeDb();


const router: Express = express();

// body-parser
router.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
dotenv.config();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());
router.use(cookieParser());


/** RULES OF OUR API */
router.use((req:Request, res:Response, next:NextFunction) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Max-Age", "1800");
		res.setHeader("Access-Control-Allow-Headers", "content-type");
		res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");

    // // set the CORS policy
    // res.header('Access-Control-Allow-Origin', '*');
    // // set the CORS headers
    // res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // // set the CORS method headers
    // if (req.method === 'OPTIONS') {
    //     res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    //     return res.status(200).json({});
    // }
    return next();
});

router.use(cors());

/** Routes */
router.use('/', routes);

router.all('/*', () => {
    throw new Error('Page doesnt exist');
  });

/** Error handling */
router.use((req, res) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3030;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));