"use strict";
// userController
const userModel = require("../models/userModel");

const users = userModel.users;

const getAllUsers = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await userModel.getUserById(res, req.params.userId);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const addUser = async (req, res) => {
  console.log("New user created: ", req.body);
  const newUser = req.body;
  const result = await userModel.addUser(newUser, res);
  res.status(201).json({ userId: result });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
};
