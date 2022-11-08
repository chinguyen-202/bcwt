"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query(
      "SELECT user_id, name, email,role FROM wop_user"
    );
    return rows;
  } catch (e) {
    console.log("error", e.message);
    res.status[500].send(e.message);
  }
};

const getUserById = async (res, userId) => {
  try {
    const userQuery =
      "SELECT user_id, name, email,role FROM wop_user WHERE user_id = " +
      userId;
    const [rows] = await promisePool.query(userQuery);
    return rows[0];
  } catch (e) {
    console.log("error", e.message);
    res.status[500].send(e.message);
  }
};

const addUser = async (user, res) => {
  try {
    const addQuery = "INSERT INTO wop_user VALUE (null,?,?,?,?)";
    const values = [user.name, user.email, user.password, user.role];
    const [result] = await promisePool.query(addQuery, values);
    return result.insertId;
  } catch (e) {
    console.log("error", e.message);
    res.status[401].send(e.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
};
