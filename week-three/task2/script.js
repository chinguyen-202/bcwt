"use strict";
(async () => {
  try {
    const response = await fetch("pics.json");
    if (!response.ok) {
      throw new Error("something went wrong");
    }
    const images = await response.json();
    const n = images[1].name; // name property of the second item of 'images' array
    const d = images[1].description; // description property of the second item of 'images' array
    const u = images[1].url; // url property of the second item of 'images' array

    document.querySelector("img").src = u;
    document.querySelector("img").alt = n;
    document.querySelector("figcaption").innerHTML = d;
  } catch (error) {
    console.log(error);
  }
})();
