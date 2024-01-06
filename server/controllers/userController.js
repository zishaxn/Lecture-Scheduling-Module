const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  console.log("data aaya hai bhai ", req.body);
  try {
    const { username, email, password, isAdmin } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      console.log("idiot! use naother name");
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      console.log("idiot! use naother name");
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      isAdmin,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
  }
};

module.exports.allInstructors = async (req, res, next) => {
  console.log('request');
  try {
    // useful to get all lecture data
    //After executing this query, the users variable will contain an array of user objects, each containing the specified fields (email, username, avatarImage, and _id).
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  console.log("request is here");
  console.log(req.body);
  try {
    console.log("req", req.params.id);
    if (!req.params.id) {
      return res.json({ msg: "User id is required " });
    }
    console.log('req is here');
    // localStorage.clear();
    // onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
