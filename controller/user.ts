import bcrypt from 'bcrypt';
import {User, UserCreate, UserCreateAPI} from '../models/user.ts';
import {validate } from 'class-validator';

const salt = 10;

// const login = async (req,res)=>{
//     let usuarioEncontrado = await pacientesServices.validateUser(req.body.email);
    
//     let compare = bcrypt.compareSync(req.body.password, usuarioEncontrado.rows[0].passhash);
//     if(!compare){
//     res.json ({
//         code: 400,
//         message : 'Invalid Password.'
//     });
//     }
//     else{
//     let token = jwt.sign({usuarioEncontrado}, key);
//     res.json( {
//         code: 200,
//         message : 'Correct login',
//         token: token
//     });
//     }
// }

const register = async (req:any,res:any )=> {

    const requestbody = new User(req.body); 

    const userNew = new UserCreateAPI();

    userNew.email = requestbody.email
    userNew.password = requestbody.password

    const errors = await validate(userNew);
    if (errors.length) {
        throw new Error("validation error: invalid body")
    }

    // const {email,password:plainTextPassword,name,lastname,role} = req.body;
    const password = await bcrypt.hash(requestbody.password,salt)
    try{

        const userCreate: UserCreate = {
            email:requestbody.email,
            password:password,
            name:requestbody.name,
            lastname:requestbody.lastname,
            role:requestbody.role
          };

        await User.create(userCreate)
        
        //  res.redirect('/')
        return res.json();     

    }catch(err){
        console.log(JSON.stringify(err))
        if(err.code === 11000){
            return res.send({
                status:'error',
                error:'Email already exist'
            })
        }
        throw err
    }
}

export {
    // login,
    register,
};