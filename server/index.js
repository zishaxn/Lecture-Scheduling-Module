const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course")
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("api/course",courseRoutes);

mongoose
  .connect(
    "mongodb+srv://zishan:zishan8291@cluster0.pamvqgm.mongodb.net/course-app?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/course-mngt",
    {
      // These options are recommended for staying updated with MongoDB's features.
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(8000, () => {
    console.log(`Server started on 8000`)
});
