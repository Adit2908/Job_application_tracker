import express from 'express';
import connectDB from './config/database.js';
import User from './models/user.js';

const app= express();

const port =1027;

app.use(express.json())

app.post("/signup",async(req,res)=>{
    //Validation of data

    //encryption of the password

   const user = new User(req.body);
   try{
    await user.save();
   res.send("User added successfully")
   }catch(err){
    res.status(400).send("Error saving the user:"+ err.message)
   }
   
})

app.get("/user",async(req,res)=>{
    const userEmail= req.body.emailId;
    try{
        const users = await User.find({emailId:userEmail})
        res.send(users)
    }catch(err){
        res.status(400).send("Something went wrong" + err.message)
    }
})

app.get("/login",(req,res)=>{
    res.send("server is running on port 1027 and already running so fast")
})

connectDB()
.then(()=>{
console.log("Datbase connceted successfully");
app.listen(port,()=>{
    console.log(`app is running on port ${1027}`)
})
}).catch((error)=>{
console.error("Database can not be connected")
})


