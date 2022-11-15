"use strict";

let p = document.querySelector("p");
let fontSize = 20;

function changeSize(event) {
  switch (event.key) {
    case "ArrowUp":
      if (fontSize >= 100) {
        p.textContent = "💥";
        break;
      }

      event.preventDefault();
      fontSize *= 1.1;
      p.style.fontSize = fontSize + "px";
      break;

    case "ArrowDown":
      if (fontSize >= 100) {
        p.innerHTML = "🎈";
      }
      event.preventDefault();
      fontSize *= 0.9;
      p.style.fontSize = fontSize + "px";
      break;

    default:
      break;
  }
}

document.body.addEventListener("keydown", changeSize);
