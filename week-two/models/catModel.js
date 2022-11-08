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

module.exports = {
  getAllCats,
  getCatById,
};
