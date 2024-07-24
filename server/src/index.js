const express = require("express");
const userRouter=require("./routes/users.router");
const authRouter=require("./routes/auth.router");
const notesRouter=require("./routes/notes.router");
const {auth}=require("./middlewares/auth.middleware");
require('dotenv').config();
require("./db");
const cors = require("cors");
// const bodyParser= require("body-parser");
const app = express();

app.use(cors());
app.use(express.json())
// app.use(bodyParser());


app.get("/", (req, res) => {
  res.send("Hello Shivang ");
});

app.use("/api/notes",auth, notesRouter);
app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);

const PORT = process.env.PORT||8080;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} port.`);
});
