const express = require("express");
const app = express();
const tasks = require("./route/tasks");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/custom-error-handlers");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI, "taskManager");
    app.listen(port, console.log(`server listening to port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
