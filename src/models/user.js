import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';
import isURL from 'validator/lib/isURL.js';


const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:50
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!isEmail(value)){
                throw new Error("Invalid email address:" + value)
            }
        }
       
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!isStrongPassword(value)){
                throw new Error("Invalid Password: " + value)
            }
        }
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"

    },
    profilePicture:{
        type:String,
        default:"",
        validate(value){
            if(isURL(value)){
                throw new Error("Invalid Photo URL: " + value)
            }
        }
    },
    location:{
        type:String,
        default:""
    },
    skills:{
        type:[String],
        default:[],
    },
    resume:{
        type:String,
        default:""
    }
},
{
    timestamps:true
})

const User= mongoose.model('User',userSchema);

export default User;