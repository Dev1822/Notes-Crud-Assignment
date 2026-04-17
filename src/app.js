require("dotenv").config();
const express=require("express");
const notesRoutes=require("./routes/note.routes")

const app=express();
app.use(express.json())

app.use("/", notesRoutes);

module.exports=app;