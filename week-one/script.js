"use strict";

const _ = require("lodash");

//Ex.1
console.log("This is JavaScript");

//Ex.2
let output =
  "Just testing nodemon, using lodash to convert" + "this camel case";
console.log(output);

output = _.camelCase(output);
console.log(output);
