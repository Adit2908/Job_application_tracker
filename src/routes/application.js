import express from "express";
import userAuth from "../middlewares/authentication.js"
import JobApplication from "../models/jobapplication.js";


const applicationRouter= express.Router();

applicationRouter.post("/application",userAuth,async(req,res)=>{
    try{
        const userId= req.user._id;
        const {companyName,jobTitle}= req.body;

        if(!companyName || !jobTitle){
            return res.status(400).json({
                message:"Company name and job title are required"
            })
        }

        const applicationRequest= new JobApplication({
            userId,
            companyName,
            jobTitle
        });
        const data= await applicationRequest.save();
        res.json({
            message:"Application created successfully",
            data

        })

    }catch(err){
        res.status(400).send("Error :" + err.message)
    }

})


export default applicationRouter;