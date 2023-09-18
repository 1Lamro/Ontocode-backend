require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const morgan = require("morgan")


app.use(express.json());
app.use(cors());
app.use(morgan("dev"))
app.use(require("./routes/comments.route"))
app.use(require("./routes/task.route"))
app.use(require("./routes/user.route"))
app.use(require("./routes/chat.route"))
app.use(require("./routes/course.route"))

// app.use(require("./routes/users.route"));

app.use('/assets', express.static(__dirname + '/assets'))

mongoose
  .connect(`${process.env.MONGO}Ontocode`)
  .then(() => console.log("Связь с MongoBD установлена"))
  .catch((error) => console.log(error.toString()));

app.listen(process.env.PORT, () => console.log("Сервер запущен"));
 