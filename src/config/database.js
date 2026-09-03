import mongoose from 'mongoose'

const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://rajputadityaprataprao2002_db_user:3OxYSOsDtftDtFPX@jobtracker.ylfl6sj.mongodb.net/jobtracker")
}


export default connectDB;