// Put code of task B here
const main = document.querySelector("main");

const article = document.createElement("article");
const header = document.createElement("header");
const h2 = document.createElement("h2");
const figure = document.createElement("figure");
const img = document.createElement("img");
const figcaption = document.createElement("figcaption");
const p = document.createElement("p");

h2.innerHTML = "Article header";
img.src = "http://placekitten.com/320/160";
img.alt = "cat image";
figcaption.innerHTML = "Some caption";
p.innerHTML =
  "Here is some text.Here is some text.Here is some text.Here is some text";

header.appendChild(h2);
article.appendChild(header);

figure.appendChild(img);
figure.appendChild(figcaption);
article.appendChild(figure);
article.appendChild(p);

main.appendChild(article);
