"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query("SELECT * FROM wop_cat");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status[500].send(e.message);
  }
};

const getCatById = async (res, catId) => {
  try {
    const row = await promisePool.query(
      "SELECT * FROM wop_cat WHERE cat_id = ?",
      [catId]
    );
    return row[0];
  } catch (e) {
    console.log("error", e.message);
    res.status[500].send(e.message);
  }
};

const addCat = async (cat, res) => {
  try {
    const addQuery = "INSERT INTO wop_cat VALUE (null,?,?,?,?,?)";
    const values = [
      cat.name,
      cat.weight,
      cat.owner,
      cat.filename,
      cat.birthdate,
    ];
    const [result] = await promisePool.query(addQuery, values);

    return result.insertId;
  } catch (e) {
    console.log("error", e.message);
    res.status[401].send(e.message);
  }
};

module.exports = {
  getAllCats,
  getCatById,
  addCat,
};
