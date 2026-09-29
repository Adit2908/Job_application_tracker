import express from "express";
import userAuth from "../middlewares/authentication.js";
import JobApplication from "../models/jobapplication.js";

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
      application,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

export default applicationRouter;
