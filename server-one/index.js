"use strict";

const express = require("express");
const app = express();
const port = 3000;

let requestCounter = 0;

app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/test", (req, res) => {
  console.log("Testing page access");
  requestCounter++;
  res.send("<h1>Test page</h1><h2>" + requestCounter + "</h2>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
