import express from "express";
import userAuth from "../middlewares/authentication.js";
import JobApplication from "../models/jobapplication.js";
import { validateEditData } from "../utils/validation.js";

const applicationRouter = express.Router();

applicationRouter.post("/application", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { companyName, jobTitle } = req.body;

    if (!companyName || !jobTitle) {
      throw new Error("company Name and job titles are required");
    }

    const applicationRequest = new JobApplication({
      userId,
      companyName,
      jobTitle,
    });
    const data = await applicationRequest.save();
    res.json({
      message: "Application created successfully",
      data,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

applicationRouter.get("/getApplication",userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    if(!userId){
      throw new Error("User not found")
    }
    const applications = await JobApplication.find({ userId });
    res.json({
      message: "user application found successfully",
      count:applications.length,
      applications
    })
   
  } catch (err) {
    res.status(400).send("Error:"+ err.message)
  }
});

applicationRouter.get("/getAllapplication", userAuth, async (req, res) => {
  try {
    const application = await JobApplication.find();
    res.json({
      message: "All appplication fetched successfully",
      count:application.length,
      application,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

applicationRouter.patch("/updateApplication/:id",userAuth,async(req,res)=>{
  try{
    if(!validateEditData(req)){
      throw new Error("Application can not be updated")
    };

    const loggedInUserId= req.user._id;
    const applicationId= req.params.id

    const application= await JobApplication.findOne({
      _id:applicationId,
      userId:loggedInUserId
    });

    if(!application){
      throw new Error("user application not found")
    }

    Object.keys(req.body).forEach((key)=> (application[key]= req.body[key]));
    await application.save();
    res.json({
      message:"Application updated successfully",
      data:application
    })
  }catch(err){
    res.status(400).send("ERROR:" + err.message)
  }
})


applicationRouter.delete("/deleteApplication/:id",userAuth,async(req,res)=>{
  try{
    const loggedInUserId= req.user._id;
    const applicationId=req.params.id;

    const application= await JobApplication.findOneAndDelete({
      _id:applicationId,
      userId:loggedInUserId
    });

    if(!application){
      throw new Error("Aplication not found")
    }
   res.json({message:"application deleted successfully"})
  }catch(err){
    res.status(400).send("ERROR :" + err.message)
  }
})

export default applicationRouter;
