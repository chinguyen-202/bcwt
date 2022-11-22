"use strict";
// catRoute
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { body } = require("express-validator");
const catController = require("../controllers/catController");
// const upload = multer({ dest: "uploads/" });
const fileFilter = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  const acceptedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (acceptedTypes.includes(file.mimetype)) {
    // To accept the file pass `true`, like so:
    cb(null, true);
  } else {
    // To reject this file pass `false`, like so:
    cb(null, false);
  }
};

const upload = multer({ dest: "uploads/", fileFilter });

router
  .get("/", catController.getCatsList)
  .get("/:catId", catController.getCatById)
  .post(
    "/",
    upload.single("cat"),
    body("name").isAlphanumeric().trim().escape(),
    body("birthdate").isDate(),
    body("weight").isFloat({ min: 0.1, max: 30 }),
    body("owner").isInt({ min: 1 }),
    catController.createCat
  )
  .put(
    "/",
    upload.single("cat"),
    body("name").isAlphanumeric().trim().escape(),
    body("birthdate").isDate(),
    body("weight").isFloat({ min: 0.1, max: 30 }),
    body("owner").isInt({ min: 1 }),
    catController.modifyCat
  )
  .put(
    "/:catId",
    body("name").isAlphanumeric().trim().escape(),
    body("birthdate").isDate(),
    body("weight").isFloat({ min: 0.1, max: 30 }),
    body("owner").isInt({ min: 1 }),
    catController.modifyCat
  )
  .delete("/:catId", catController.deleteCat); //TODO: add validators

module.exports = router;
