"use strict";
// userController
const userModel = require("../models/userModel");
const {validationResult} = require('express-validator')

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
  console.log('validation error', console.errors;)
  if(errors.isEmpty()){
    const result = await userModel.addUser(newUser, res);
    res.status(201).json({message:'user created', userId: result});
  }else{
    res.status(400).json({
      message: 'user creation failed',
      errors: errors.array()
    });
  }
  };

  const modifyUser = (req, res) => {
    
    // TODO: add functionality & data model
  };
  const deleteUser = (req, res) => {
    // TODO: add functionality & data model
  };
 

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  modifyUser,
  deleteUser
};
