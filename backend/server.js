const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const cors = require("cors");
const connectDB = require("./config/database");
// const userRoutes = express.Router();
const userRoutes = require("./routes/userRoutes")

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

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
