"use strict";
// userController
const userModel = require("../models/userModel");

const users = userModel.users;

const getUserList = (req, res) => {
  users.map((user) => {
    delete user.password;
    return user;
  });
  res.json(users);
};

const getUser = (req, res) => {
  const user = users.filter((user) => req.params.userId == user.id)[0];
  if (user) {
    delete user.password;
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const createUser = (req, res) => {
  console.log(req.body);
  res.json(req.body);
};

module.exports = {
  getUserList,
  getUser,
  createUser,
};
