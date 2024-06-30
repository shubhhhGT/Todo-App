const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () =>
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected sucessfully"))
    .catch(() => {
      console.log("DB connection failed!");
      process.exit(1);
    });

module.exports = dbConnect;
