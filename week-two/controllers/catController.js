"use strict";
// catController
const catModel = require("../models/catModel");

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
  // const cat = cats.filter((cat) => req.params.catId == cat.id)[0];
  // if (cat) {
  //   res.json(cat);
  // } else {
  //   res.sendStatus(404);
  // }
};

const createCat = async (req, res) => {
  const newCat = req.body;
  newCat.filename = req.file.filename;
  console.log("New cat created: ", newCat);
  const result = await catModel.addCat(newCat, res);
  res.status(201).json({ catId: result });
};

const deleteCat = async (req, res) => {
  const result = await catModel.deleteCatById(req.params.catId, res);

  if (result.affectedRows > 0) {
    console.log("delete cat: ", result);
    res.status(200).json({ message: "cat deleted" });
  } else {
    res.status(404).json({ message: "Cat not exist in database" });
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
