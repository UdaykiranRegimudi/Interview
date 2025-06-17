const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const verifyToken  = require("../auth/middleware");


//task data 


// Task Routes
router.get("/", verifyToken, async (req, res) => {
  const tasks = await Task.find({ created_by: req.userId });
  res.json(tasks);
});

router.post("/", verifyToken, async (req, res) => {
  const task = new Task({ ...req.body, created_by: req.userId });
  await task.save();
  res.status(201).json(task);
});

router.put("/:id", verifyToken, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updated_at: new Date() },
    { new: true }
  );
  res.json(task);
});

router.delete("/:id", verifyToken, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

router.post("/:id/comments", verifyToken, async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.comments.push({ text: req.body.text });
  await task.save();
  res.json(task);
});

router.get("/:id/activity", verifyToken, async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json({ created_at: task.created_at, updated_at: task.updated_at, comments: task.comments });
});

module.exports = router;