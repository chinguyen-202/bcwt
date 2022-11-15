"use strict";

const dots = [];

for (let i = 0; i < 10; i++) {
  var element = document.createElement("div");
  element.className = "trail";
  document.body.appendChild(element);
  dots.push(element);
}

let currentIndex = 0;

function mouseTrail(event) {
  const dot = dots[currentIndex];

  dot.style.left = event.pageX + "px";
  dot.style.top = event.pageY + "px";
  currentIndex = (currentIndex + 1) % dots.length;
}

addEventListener("mousemove", mouseTrail);
