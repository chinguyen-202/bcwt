"use strict";
// catController
const catModel = require("../models/catModel");
const { validationResult } = require("express-validator");

const cats = catModel.cats;

const getCatsList = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const getCatById = async (req, res) => {
  const cat = await catModel.getCatById(res, req.params.catId);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const createCat = async (req, res) => {
  const errors = validationResult(req);
  if (!req.file) {
    res.status(404).json({ message: "file missing or invalid" });
  } else if (errors.isEmpty()) {
    const cat = req.body;
    cat.owner = req.user.user_id;
    cat.filename = req.file.filename;
    console.log("creating a new cat:", cat);
    const catId = await catModel.addCat(cat, res);
    res.status(201).json({ message: "cat created", catId });
  } else {
    console.log("validation errors", errors);
    res
      .status(400)
      .json({ message: "cat creation failed", errors: errors.array() });
  }
};

const deleteCat = async (req, res) => {
  const result = await catModel.deleteCatById(
    req.params.catId,
    req.user.user_id,
    res
  );

  if (result.affectedRows > 0) {
    console.log("delete cat: ", result);
    res.status(200).json({ message: "cat deleted" });
  } else {
    res.status(401).json({ message: "Cat delete failed" });
  }
};

const modifyCat = async (req, res) => {
  const editCat = req.body;
  const catId = req.params.catId;
  console.log("Edit cat info: ", editCat);
  const result = await catModel.editCatById(catId, editCat, res);
  if (result.affectedRows > 0) {
    console.log("cat with ID info change: ", catId);
    res.status(200).json({ message: "cat edited" });
  } else {
    res.status(404).json({ message: "Cat not exist in database" });
  }
};

module.exports = {
  getCatsList,
  getCatById,
  createCat,
  deleteCat,
  modifyCat,
};
