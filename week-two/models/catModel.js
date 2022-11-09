"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    const sql =
      "SELECT cat_id, wop_cat.name, weight,filename,birthdate,wop_user.name AS owner FROM wop_cat, wop_user WHERE wop_cat.owner = wop_user.user_id";
    const [rows] = await promisePool.query(sql);
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

const deleteCatById = async (catId, res) => {
  try {
    const row = await promisePool.query(
      "DELETE FROM wop_cat WHERE cat_id = ?",
      [catId]
    );
    return row[0];
  } catch (e) {
    console.log("error", e.message);
    res.status[500].send(e.message);
  }
};

const editCatById = async (catId, cat, res) => {
  try {
    const query =
      "UPDATE wop_cat SET name = ?, weight = ?, owner=?, birthdate = ? WHERE cat_id = ?";
    const values = [cat.name, cat.weight, cat.owner, cat.birthdate, catId];
    const [result] = await promisePool.query(query, values);
    return result;
  } catch (e) {
    console.log("error", e.message);
    res.status[500].send(e.message);
  }
};

module.exports = {
  getAllCats,
  getCatById,
  addCat,
  deleteCatById,
  editCatById,
};
