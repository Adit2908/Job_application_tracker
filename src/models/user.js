import mongoose from 'mongoose'

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String
    },
    profilePicture:{
        type:String
    },
    location:{
        type:String
    },
    skills:{
        type:String
    },
    resume:{
        type:String
    }
},
{
    timestamps:true
})

const User= mongoose.model('User',userSchema);

export default User;