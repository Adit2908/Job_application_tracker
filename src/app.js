import express from "express";
import connectDB from "./config/database.js";

import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.js";
const app = express();

const port = 1027;
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter)



// app.get("/profile", userAuth, async (req, res) => {
//   try {
//     const user = await req.user;
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("ERROR:" + err.message);
//   }
// });

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
