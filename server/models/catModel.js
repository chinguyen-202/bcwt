'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    const sql =
      'SELECT cat_id, wop_cat.name, weight,owner, filename,birthdate,wop_user.name AS ownername FROM wop_cat JOIN wop_user ON wop_cat.owner = wop_user.user_id';
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    res.status[500].send(e.message);
  }
};

const getCatById = async (res, catId) => {
  try {
    const row = await promisePool.query(
      'SELECT * FROM wop_cat WHERE cat_id = ?',
      [catId]
    );
    console.log('getting cat', row[0]);
    return row[0];
  } catch (e) {
    console.log('error', e.message);
    res.status[500].send(e.message);
  }
};

const addCat = async (cat, res) => {
  try {
    const addQuery = 'INSERT INTO wop_cat VALUE (null,?,?,?,?,?)';
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
    console.log('error', e.message);
    res.status[401].send(e.message);
  }
};

const deleteCatById = async (catId, owner, res) => {
  try {
    const [rows] = await promisePool.query(
      'DELETE FROM wop_cat WHERE cat_id = ? AND owner = ?',
      [catId, owner]
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
    res.status[500].send(e.message);
  }
};

const editCatById = async (cat, user, res) => {
  try {
    console.log(user, 'is modifying cat:', cat);
    let sql, values;
    // if admin user
    if (user.role == 0) {
      sql =
        'UPDATE wop_cat SET name = ?, weight = ?, birthdate = ?, owner = ? ' +
        'WHERE cat_id = ?';
      values = [cat.name, cat.weight, cat.birthdate, cat.owner, cat.id];
    } else {
      sql =
        'UPDATE wop_cat SET name = ?, weight = ?, birthdate = ? ' +
        'WHERE cat_id = ? AND owner = ?';
      values = [cat.name, cat.weight, cat.birthdate, cat.id, user.user_id];
    }
    const [rows] = await promisePool.query(sql, values);
    return rows;
  } catch (e) {
    console.log('error', e.message);
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getAllCats,
  getCatById,
  addCat,
  deleteCatById,
  editCatById,
};
