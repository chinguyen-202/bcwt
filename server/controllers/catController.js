'use strict';
// catController
const catModel = require('../models/catModel');
const { validationResult } = require('express-validator');
const { makeThumbnail } = require('../utils/image.js');

const cats = catModel.cats;

const getCatsList = async (req, res) => {
  const cats = await catModel.getAllCats();
  cats.map((cat) => {
    // convert birthdate date object to 'YYYY-MM-DD' string format
    cat.birthdate = cat.birthdate.toISOString().split('T')[0];
    return cat;
  });
  res.json(cats);
};

const getCatById = async (req, res) => {
  const cat = await catModel.getCatById(res, req.params.catId);
  if (cat) {
    // convert date object to 'YYYY-MM-DD' format
    cat.birthdate = cat.birthdate.toISOString().split('T')[0];
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const createCat = async (req, res) => {
  const errors = validationResult(req);
  if (!req.file) {
    res.status(404).json({ message: 'file missing or invalid' });
  } else if (errors.isEmpty()) {
    await makeThumbnail(req.file.path, req.file.filename);
    const cat = req.body;
    cat.owner = req.user.user_id;
    cat.filename = req.file.filename;
    console.log('creating a new cat:', cat);
    const catId = await catModel.addCat(cat, res);
    res.status(201).json({ message: 'cat created', catId });
  } else {
    console.log('validation errors', errors);
    res
      .status(400)
      .json({ message: 'cat creation failed', errors: errors.array() });
  }
};

const deleteCat = async (req, res) => {
  const result = await catModel.deleteCatById(
    req.params.catId,
    req.user.user_id,
    res
  );

  if (result.affectedRows > 0) {
    console.log('delete cat: ', result);
    //TODO: check what happen when sql query is not working
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'cat deleted' });
    }
  } else {
    res.status(401).json({ message: 'Cat delete failed' });
  }
};

const modifyCat = async (req, res) => {
  const cat = req.body;
  const user = req.user;
  if (req.params.catId) {
    cat.id = req.params.catId;
  }
  console.log('Edit cat info: ', editCat);
  //console.log('user', user, 'modifies cat:', cat);
  const result = await catModel.updateCatById(cat, user, res);
  if (result.affectedRows > 0) {
    res.json({ message: 'cat modified: ' + cat.id });
  } else {
    res.status(400).json({ message: 'nothing modified' });
  }
};

module.exports = {
  getCatsList,
  getCatById,
  createCat,
  deleteCat,
  modifyCat,
};
