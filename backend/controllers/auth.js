const { credentials } = require("../types");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    // get username and password from req body
    const { username, password } = req.body;

    // Validate the inputs
    const validatedInputs = credentials.safeParse({ username, password });

    // If wrong inputs return error
    if (!validatedInputs.success) {
      return res.status(411).json({
        msg: "Invalid inputs",
      });
    }

    //   Check if user already exists
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(403).json({
        success: false,
        msg: "User already exists, please login!",
      });
    }

    //   Hash the password and save to db
    const hashedPassword = await bcrypt.hash(password, 10);

    // signup
    await User.create({ username: username, password: hashedPassword });

    // return res
    res.status(200).json({ msg: "user created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Get username and password from req body
    const { username, password } = req.body;

    // Validate the inputs
    const validatedInputs = credentials.safeParse({ username, password });
    if (!validatedInputs.success) {
      return res.status(411).json({
        msg: "Invalid inputs",
      });
    }

    // Find the existing user to validate password
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(403).json({
        success: false,
        msg: "Please sign up first!",
      });
    }
    // Validate the password
    const hashedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!hashedPassword) {
      return res.status(401).json({
        success: false,
        message: "Password does not match",
      });
    }

    // make a payload and give a jwt
    const payload = {
      id: existingUser._id,
      username: username,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      success: true,
      msg: "Signed in successfully",
      data: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};
