require('dotenv').config();
const PORT = process.env.PORT || 3500;

const { default: mongoose } = require("mongoose");
const connectDB = require("./config/dbConn");
const express = require("express");
const app = express();
const cors = require("cors");
connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/register", require("./routes/register"));
app.use("/login", require('./routes/login'));

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log("Server is running");
    console.log("MongoDB connected");
  });
});
