"use strict";
// catRoute
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

router
  .get("/", userController.getAllUsers)
  .get("/:userId", userController.getUserById)
  .post(
    "/",
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("passwd").isLength({ min: 8 }),
    userController.addUser
  );
router.put("/", (req, res) => {
  res.send("With this endpoint you can edit users.");
});
router.delete("/", (req, res) => {
  res.send("With this endpoint you can delete users.");
});

module.exports = router;
