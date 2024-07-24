const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function signup(req, res) {
  // Signup
  const userDetails = req.body;
  console.log({userDetails});
  try {
    if (!userDetails) {
      throw Error("User details Not found");
    }
    const { name, email, password } = userDetails;
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const passwordHash = await bcrypt.hash(password, salt);
    console.log({ passwordHash });

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });

    await newUser.save();
    res.status(201).json({success:201, message: "user is registered successfully" });
  } catch (error) {
    console.log({error});
    res.status(500).json({success:500, message: `Error in signup, ${error}` });
  }
}

async function signin(req, res) {
  // login
  const userDetails = req.body;

  try {
    if (!userDetails) {
      throw Error("Login details are missing");
    }
    const { email, password } = userDetails;
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("Email not exists.");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw Error("Email or password is wrong");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({success:200, token });
  } catch (error) {
    res.status(500).json({success:500, message: `Error while login ${error}` });
  }
}

module.exports = {
  signup,
  signin,
};
