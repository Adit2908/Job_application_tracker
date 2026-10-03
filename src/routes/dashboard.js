import express from "express";
import userAuth from "../middlewares/authentication.js";
import JobApplication from "../models/jobapplication.js";


const dashboardRouter= express.Router();


dashboardRouter.get("/stats",userAuth,async(req,res)=>{
    try{
        const userId=req.user._id;

        const totalApplication = await JobApplication.countDocuments({
            userId,
        });

        const applied= await JobApplication.countDocuments({
            userId,
            status:"Applied"
        });

        const oa= await JobApplication.countDocuments({
            userId,
            status:"OA"
        });

        const interview= await JobApplication.countDocuments({
            userId,
            status:"Interview",
        });

        const rejected= await JobApplication.countDocuments({
            userId,
            status:"Rejected",

        });

        const selected= await JobApplication.countDocuments({
            userId,
            status:"Selected"
        })

        res.send({
            totalApplication,
            applied,
            oa,
            interview,
            rejected,
            selected,
        });

    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }
})



export default dashboardRouter;
