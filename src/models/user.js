import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import isStrongPassword from "validator/lib/isStrongPassword.js";
import isURL from "validator/lib/isURL.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!isEmail(value)) {
          throw new Error("Invalid email address:" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!isStrongPassword(value)) {
          throw new Error("Invalid Password: " + value);
        }
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profilePicture: {
      type: String,
      default: "",
      validate(value) {
        if (isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    location: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    resume: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "JOB@Tracker$790", {
    expiresIn: "30d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user=this;
    const passwordHash=user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid; 
    
};

const User = mongoose.model("User", userSchema);

export default User;
