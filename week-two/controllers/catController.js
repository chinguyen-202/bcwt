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

const createCat = (req, res) => {
  console.log(req.body);
  res.send("adding a cat");
};

module.exports = {
  getCatsList,
  getCatById,
  createCat,
};
