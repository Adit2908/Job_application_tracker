import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    jobUrl: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    jobType: {
      type: String,
      enum: [
        "Applied",
        "Screening",
        "Interview",
        "Offer",
        "Rejected",
        "withDrawn",
      ],
      default: "Applied",
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: Number,
    },
    notes: {
      type: String,
      trim: true,
    },
    interviewDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

applicationSchema.index(
  { userId: 1, companyName: 1, jobTitle: 1 },
  { unique: true },
);


const JobApplication = mongoose.model("Application", applicationSchema);

export default JobApplication;


