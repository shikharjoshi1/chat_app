const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const cors = require("cors");
const connectDB = require("./config/database");
// const userRoutes = express.Router();
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json()); //so that the frontend accepts json data

const morgan = require("morgan");
const { notFound, errorHandler } = require("./middlewares/errorHandling");
// const connectDB = require("./config/database");
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;


//Web socket initialization and function call
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection",(socket)=>{
  console.log('connected to socket.io');

  socket.on('setup',(userData)=>{
    socket.join(userData._id);
    // console.log(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room)=>{
    socket.join(room);
    console.log("User Joined Room:"+ room);
  })

  //typing... logic
  socket.on('typing',(room)=>socket.in(room).emit('typing'));
  socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'));


  socket.on('new message',(newMessageReceived)=>{
    var chat = newMessageReceived.chat;

    if(!chat.users) return console.log('chat.users not defined');

    chat.users.forEach(user=>{
      if(user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit('message received', newMessageReceived);

    });
  })

})