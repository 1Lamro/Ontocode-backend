require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const http = require('http').Server(app)



const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

app.use(express.json());
app.use(express.static('static'))
app.use(cors());
app.use(morgan("dev"))
app.use("/images", express.static(__dirname + "/images"));

app.use(require("./routes/comments.route"))
app.use(require("./routes/task.route"))
app.use(require("./routes/user.route"))
app.use(require("./routes/chat.route"))
app.use(require("./routes/course.route"))

app.use(require("./routes/user.route"));
app.use(require("./routes/task.route"));
app.use(require("./routes/course.route"));
app.use(require("./routes/chat.route"));

const users = []


socketIO.on('connection', (socket) => {
  console.log(`${socket.id} user connected`);
  socket.on('message', (data) => {
    socketIO.emit('response', data)
  })
  socket.on('leaveChat', () => {
    users.filter(user => user.socketID !== socket.id);
    socket.emit('responseNewUser', users)
  });
  socket.on('typing', (data) => socket.broadcast.emit('responseTyping', data))
  socket.on('newUser', (data) => {
    users.push(data)
    socketIO.emit('responseNewUser', users)
  })
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnect`);
  })
});
// app.get('/chat/users', (req, res) => {
//   res.send(users)
// })
app.use('/assets', express.static(__dirname + '/assets'))

mongoose
  .connect(`${process.env.MONGO}Ontocode`)
  .then(() => console.log("Связь с MongoBD установлена"))
  .catch((error) => console.log(error.toString()));

http.listen(process.env.PORT, () => console.log("Сервер запущен"));
