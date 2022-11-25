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

const getUserLogin = async (user) => {
  try {
    console.log("getUserLogin()", user);
    const [rows] = await promisePool.execute(
      "SELECT * FROM wop_user WHERE email = ?;",
      user
    );
    return rows;
  } catch (e) {
    console.log("error", e.message);
    res.status[401].send(e.message);
  }
};

const addUser = async (user, res) => {
  try {
    const addQuery = "INSERT INTO wop_user VALUE (null,?,?,?,?)";
    const values = [user.name, user.email, user.passwd, user.role];
    const [result] = await promisePool.query(addQuery, values);
    return result.insertId;
  } catch (e) {
    console.log("error", e.message);
    res.status[401].send(e.message);
  }
};

const deleteUserById = async (userId, res) => {
  try {
    const row = await promisePool.query(
      "DELETE FROM wop_user WHERE user_id = ?",
      [userId]
    );
    return row[0];
  } catch (e) {
    console.log("error", e.message);
    res.status[500].send(e.message);
  }
};

const editUserById = async (userId, user, res) => {
  try {
    const query =
      "UPDATE wop_user SET name = ?, email = ?, password=?, role = ? WHERE user_id = ?";
    const values = [user.name, user.email, user.password, user.role, userId];
    const [result] = await promisePool.query(query, values);
    return result;
  } catch (e) {
    console.log("error", e.message);
    res.status[500].send(e.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
  editUserById,
  getUserLogin,
};
