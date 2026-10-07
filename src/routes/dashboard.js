import express from "express";
import userAuth from "../middlewares/authentication.js";
import JobApplication from "../models/jobapplication.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/stats", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await JobApplication.aggregate([
      {
        $match: { userId },
      },
      {
        $group: {
          _id: null, // Groups everything into one object
          totalApplication: { $sum: 1 },
          applied: { $sum: { $cond: [{ $eq: ["$status", "Applied"] }, 1, 0] } },
          oa: { $sum: { $cond: [{ $eq: ["$status", "OA"] }, 1, 0] } },
          interview: {
            $sum: { $cond: [{ $eq: ["$status", "Interview"] }, 1, 0] },
          },
          rejected: {
            $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] },
          },
          selected: {
            $sum: { $cond: [{ $eq: ["$status", "Selected"] }, 1, 0] },
          },
        },
      },
    ]);

    // Fallback default if user has no applications yet
    const defaultStats = {
      totalApplication: 0,
      applied: 0,
      oa: 0,
      interview: 0,
      rejected: 0,
      selected: 0,
    };

    // Extract values and discard the '_id: null' field cleanly
    const { _id, ...cleanStats } = stats[0] || defaultStats;

    // Return the clean data and stop execution with an explicit return
    return res.status(200).json(cleanStats);
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return res.status(500).json({
      message: "Failed to fetch dashboard statistics",
    });
  }
});

dashboardRouter.get("/analytics", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const analytics = await JobApplication.aggregate([
      {
        $match: { userId },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);
    res.status(200).send(analytics);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

export default dashboardRouter;
