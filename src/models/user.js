import mongoose from 'mongoose'

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
        validate:{
            validator: function(v){

            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"

    },
    profilePicture:{
        type:String,
        default:"",
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