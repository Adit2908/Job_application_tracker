import express from "express";
import {validateSignUpData} from "../utils/validation.js";
import bcrypt from "bcrypt"
import userAuth from "../middlewares/authentication.js"
import User from "../models/user.js";

const authRouter=express.Router();

authRouter.post("/signup", async (req, res) => {
  //Validation of data
  validateSignUpData(req);
  //encryption of the password
  const { firstName, lastName, emailId, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password)

    if (isPasswordValid) {
      //Create a  JWT token
      const token = await user.getJWT();
      

      //Add the token to the cookie and send the response back to the user
      res.cookie("token", token,{
    expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
  });

      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Err:" + err.message);
  }
});

authRouter.post("/logout",(req,res)=>{
res.cookie("token",null,{expires:new Date(Date.now())})
res.send("Logout successful")
})

authRouter.get("/me", userAuth, async (req, res) => {
  try {
    const user = await req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});




export default authRouter;

