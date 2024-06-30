// create a express app with express.json middleware
const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
require("dotenv").config();

// Connect to DB
const dbConnect = require("./config/db");
dbConnect();

// Routes
const userRoutes = require("./routes/index");
app.use("/user", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Your server is Up and running..." });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// listen on port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
