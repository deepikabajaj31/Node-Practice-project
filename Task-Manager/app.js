const express = require("express");
const notFound = require("./middleware/notFound");
const app = express();
const tasks = require("./routes/tasks");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.send("Task Manager App");
});
app.use("/api/v1/tasks", tasks);
app.use(notFound);

const port = 3000;
const start = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => console.log("CONNECTED"));
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
