"use strict";
// catRoute
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getUserById);
// router.get("/:catId", (req, res) => {
//   res.send("You reqested a cat whose id is " + req.params.catId);
// });

router.post("/", userController.addUser);

router.put("/", (req, res) => {
  res.send("With this endpoint you can edit users.");
});

router.delete("/", (req, res) => {
  res.send("With this endpoint you can delete users.");
});

module.exports = router;
