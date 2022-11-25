"use strict";
// userController
const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");

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
  if (!newUser.role) {
    newUser.role = 1;
  }
  const errors = validationResult(req);
  console.log("validation error", errors);
  if (errors.isEmpty()) {
    const result = await userModel.addUser(newUser, res);
    res.status(201).json({ message: "user created", userId: result });
  } else {
    res.status(400).json({
      message: "user creation failed",
      errors: errors.array(),
    });
  }
};

const modifyUser = async (req, res) => {
  const editUser = req.body;
  const userId = req.params.userId;
  console.log("Edit user info: ", editUser);
  const result = await userModel.editUserById(userId, editUser, res);
  if (result.affectedRows > 0) {
    console.log("user with ID info change: ", userId);
    res.status(200).json({ message: "user edited" });
  } else {
    res.status(404).json({ message: "User not exist in database" });
  }
};

const deleteUser = async (req, res) => {
  const result = await userModel.deleteUserById(req.params.userId, res);

  if (result.affectedRows > 0) {
    console.log("delete user: ", result);
    res.status(200).json({ message: "user deleted" });
  } else {
    res.status(404).json({ message: "User not exist in database" });
  }
};

const checkToken = (req, res) => {
  res.json({ user: req.user });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  modifyUser,
  deleteUser,
  checkToken,
};
