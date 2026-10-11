import express from "express";
import userAuth from "../middlewares/authentication.js";
import Task from "../models/taskSchemas.js";
import { validateTaskData } from "../utils/validation.js";

const taskRouter = express.Router();

taskRouter.post("/task", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { title } = req.body;

    if (!title) {
      throw new Error("Tasks Title is required field");
    }

    const taskRequest = new Task({
      userId,
      title,
    });

    const data = await taskRequest.save();
    res.status(201).json({
      message: "task is created successfully",
      data,
    });
  } catch (err) {
    res.status(500).send("ERROR:" + err.message);
  }
});

taskRouter.get("/task", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      throw new Error("Invalid Credentials");
    }
    const tasks = await Task.find({ userId });
    res.status(200).json({
      message: "User got the task successfully",
      tasks,
    });
  } catch (err) {
    res.status(500).send("ERROR:  " + err.message);
  }
});

taskRouter.patch("/task/:id", userAuth, async (req, res) => {
  try {
    if (!validateTaskData(req)) {
      return res.status(400).json({
        message:"task can not be edited"
      })
     
    }
    const loggedInUserId = req.user._id;
    const taskId = req.params.id;

    const tasks = await Task.findOne({
      _id: taskId,
      userId: loggedInUserId,
    });

    if (!tasks) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    Object.keys(req.body).forEach((key) => (tasks[key] = req.body[key]));

    await tasks.save();
    res.json({
      message: "Task field is updated successfully",
      tasks,
    });
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

taskRouter.delete("/task/:id", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const taskId = req.params.id;

    const tasks = await Task.findOneAndDelete({
      _id: taskId,
      userId: loggedInUserId,
    });

    if (!tasks) {
      throw new Error("Tasks not found");
    }
    res.json({ message: "tasks deleted successfully" });
  } catch (err) {
    res.status(500).send("ERROR :" + err.message);
  }
});

export default taskRouter;
