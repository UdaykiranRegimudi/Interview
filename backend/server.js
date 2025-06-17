const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoute = require("./routes/auth");
const taskRoute = require("./routes/task");

const mongodburi = process.env.MONGODB_URI;

//using mongodb as a database


const app = express();
app.use(express.json());
app.use(cors());


//creating routing here
app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);
mongoose.connect(mongodburi);

//mongodb connection



app.listen(5000, () => console.log("Server running on port 5000"));