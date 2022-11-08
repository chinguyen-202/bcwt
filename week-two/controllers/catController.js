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

const addCat = async (req, res) => {
  const newCat = req.body;
  newCat.filename = req.file.filename;
  console.log("New cat created: ", newCat);
  const result = await catModel.addCat(newCat, res);
  res.status(201).json({ catId: result });
};


module.exports = {
  getCatsList,
  getCatById,
  addCat,
};
