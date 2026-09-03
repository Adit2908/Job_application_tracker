import express from 'express';
import connectDB from './config/database.js';
import User from './models/user.js';

const app= express();

const port =1027;

app.post("/signup",async(req,res)=>{
   const user = new User({
    name:"Virat Kholi",
    emailId:"virat@gmail.com",
    password:"Virat@123"
   });
   try{
    await user.save();
   res.send("User added successfully")
   }catch(err){
    res.status(400).send("Error saving the user:"+ err.message)
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


