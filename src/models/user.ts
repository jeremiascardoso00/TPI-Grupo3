import mongoose from "mongoose";
import { IsString, MaxLength, MinLength, IsEmail} from 'class-validator';

const userSchema = new mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required : true,        
    },
    lastname: {
        type: String,
        required : true,
    },
    role : {
        type: String,
        required : true,
    }
})

// Actual model.
export class UserClass {
    email : string;
    password : string;
    name : string;
    lastname: string;
    role : string;
    constructor(newUser: any) {
        this.email = newUser.email;
        this.password = newUser.password;
        this.name = newUser.name;
        this.lastname = newUser.lastname;
        this.role = newUser.role;
      }
  }

// Model for creating item in database.
export type UserCreate = Pick<UserClass, 'email' | 'password' | 'name' | 'lastname' | 'role'>;

// Validation model which comes to the API.
export class UserCreateAPI implements Pick<UserClass, 'email' | 'password' | 'name' | 'lastname' | 'role'> {
    @IsString()
    name: string;
    
    @IsString()
    lastname: string;

    @IsString()
    role: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    password: string;
}

export const User = mongoose.model('User',userSchema) 