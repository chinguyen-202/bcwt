"use strict";

const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

router.post("/login", login).post("/logout").post("/register");

module.exports = router;
