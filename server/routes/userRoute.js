"use strict";
// catRoute
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

router
  .get("/", userController.getAllUsers)
  .get("/token", userController.checkToken)
  .get("/:userId", userController.getUserById)
  .post(
    "/",
    body("name").isLength({ min: 3 }).trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("passwd").isLength({ min: 8 }).trim(),
    userController.addUser
  )
  .put("/", userController.modifyUser)
  .delete("/", userController.deleteUser);

module.exports = router;
