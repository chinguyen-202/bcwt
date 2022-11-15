"use strict";

function asTabs(node) {
  const tabs = [];

  for (var i = 0; i < node.childNodes.length; i++) {
    var child = node.childNodes[i];
    if (child.nodeType == document.ELEMENT_NODE) tabs.push(child);
  }

  const btnList = document.createElement("div");
  tabs.forEach((tab, i) => {
    tab.style.display = "none";
    const button = document.createElement("button");
    button.textContent = tab.getAttribute("data-tabname");
    btnList.appendChild(button);
    button.addEventListener("click", function () {
      buttonClick(i);
    });
  });

  node.insertBefore(btnList, node.firstChild);

  function buttonClick(index) {
    tabs.forEach((tab, i) => {
      if (i == index) tab.style.display = "";
      else tab.style.display = "none";
    });
  }
}

asTabs(document.querySelector("tab-panel"));
