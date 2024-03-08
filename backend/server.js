const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const cors = require('cors');

const app = express()
dotenv.config();

app.use(cors());

const morgan = require("morgan");
app.use(morgan("dev"));

app.get('/', (req,res)=>{
    res.send("API is running successfully");
});
app.get('/api/chat', (req,res)=>{
    res.json({"chats":chats});
});
app.get('/api/chat/:id', (req,res)=>{
    // console.log(req);
    const singleChat = chats.find((c)=>c._id === req.params.id)
    res.send(singleChat);
});

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`));