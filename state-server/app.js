"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

const user = {
  username: "foo",
  password: "bar",
};
let loggedIn = false;

app.set("views", "./views");
app.set("view engine", "pug");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.get("/secret", (req, res) => {
  if (loggedIn) {
    res.render("secret");
  } else {
    res.redirect("/form");
  }
});

app.post("/login", (req, res) => {
  // check for usename/password match
  console.log(req.body);
  if (
    req.body.username == user.username &&
    req.body.password == user.password
  ) {
    // set session variable
    loggedIn = true;
  }
  res.redirect("/secret");
});

app.get("/getCookie", (req, res) => {
  console.log(req.cookies);
  res.send("your color of choice is : " + req.cookies.color);
});

app.get("/setCookie/:color", (req, res) => {
  console.log(req.params.color);
  res.cookie("color", req.params.color);
  res.send("cookie set");
});

app.get("/deleteCookie", (req, res) => {
  res.clearCookie("color");
  res.send("color cookie removed");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
