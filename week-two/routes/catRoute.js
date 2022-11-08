"use strict";
// catRoute
const express = require("express");
const router = express.Router();
const multer = require("multer");

const catController = require("../controllers/catController");

const upload = multer({ dest: "uploads/" });

router.get("/", catController.getCatsList);

router.get("/:catId", catController.getCatById);
// router.get("/:catId", (req, res) => {
//   res.send("You reqested a cat whose id is " + req.params.catId);
// });

router.post("/", upload.single("cat"), catController.createCat);

router.put("/", (req, res) => {
  res.send("With this endpoint you can edit cats.");
});

router.delete("/", (req, res) => {
  res.send("With this endpoint you can delete cats.");
});

module.exports = router;
