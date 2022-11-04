"use strict";

const express = require("express");
const app = express();
const port = 3000;

let requestCounter = 0;

app.use(express.static("public"));
app.set("view engine", "pug");

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/test", (req, res) => {
  console.log("Testing page access");
  requestCounter++;
  res.render("index", {
    title: "Pug test page",
    header: "Test page",
    text: "Page was requested " + requestCounter + " times.",
  });

  //   res.send("<h1>Test page</h1><h2>" + requestCounter + "</h2>");
});

app.get("/catinfo", (req, res) => {
  const cat = {
    name: "Frank",
    birthdate: "2010-12-25",
    weight: 5,
  };
  res.json(cat);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
