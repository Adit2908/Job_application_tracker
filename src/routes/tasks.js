import express from "express";
import userAuth from "../middlewares/authentication.js";
import Task from "../models/taskSchemas.js";

const taskRouter = express.Router();

taskRouter.post("/task", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { title } = req.body;

    if (!title) {
      throw new Error("Tasks Title is required field");
    }

    const taskRequest = new Task({
      userId,
      title,
    });

    const data= await taskRequest.save();
    res.json({
        message:"task is created successfully",
        data
    })

  } catch (err) {
    res.status(400).send("ERROR:"+ err.message)
  }
});

taskRouter.get("/task",userAuth,async(req,res)=>{
  try{
  const userId= req.user._id;
  if(!userId){
    throw new Error("Invalid Credentials");
  }
  const tasks= await Task.find({userId});
  res.json({
    message:"User got the task successfully",
    tasks
  })
  }catch(err){
    res.status(400).send("ERROR:  "+ err.message);
  }
})

export default taskRouter;
