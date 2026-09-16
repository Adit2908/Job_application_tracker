import express from "express";
import connectDB from "./config/database.js";
import User from "./models/user.js";
import validateSignUpData from "./utils/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import userAuth from "./middlewares/authentication.js"
const app = express();

const port = 1027;

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  //Validation of data
  validateSignUpData(req);
  //encryption of the password
  const { firstName, lastName, emailId, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  console.log(passwordHash);

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

app.post("/login", async (req, res) => {
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
      console.log(token);

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

app.get("/profile",userAuth, async (req, res) => {
  try{
  const user = await req.user
  res.send(user);
  }catch(err){
    res.status(400).send("ERROR:" + err.message)
  }
  
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.get("/login", (req, res) => {
  res.send("server is running on port 1027 and already running so fast");
});

connectDB()
  .then(() => {
    console.log("Datbase connected successfully");
    app.listen(port, () => {
      console.log(`app is running on port ${1027}`);
    });
  })
  .catch((error) => {
    console.error("Database can not be connected");
  });
