const mongoose = require('mongoose')

// Task Schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ["todo", "in_progress", "done"], default: "todo" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  assignee_id: String,
  created_by: String,
  due_date: Date,
  tags: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  comments: [
    {
      text: String,
      created_at: { type: Date, default: Date.now },
    },
  ],
});
const Task = mongoose.model("Task", taskSchema);


module.exports = Task;