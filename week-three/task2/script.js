"use strict";

const baseUrl = "https://api.tvmaze.com";

const form = document.querySelector("#search-form");
const query = document.querySelector("#query");
const result = document.querySelector("#result");

const fetchShow = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const url = form.action + "?q=" + query.value;
  const tvShows = await fetchShow(url);
  displayShows(tvShows);
  console.log(tvShows);
});

const displayShows = (tvShows) => {
  const result = document.querySelector("#result");
  result.innerHTML = "";

  if (tvShows.length == 0)
    result.innerHTML += `<article>
                                            <header>
                                                <h2 id="name">Can not find movie</h2>
                                            </header>
                                        </article>`;
  else
    tvShows.forEach((show) => {
      result.innerHTML += `<article>
                        <header>
                            <h2 id="name">${show.show.name}</h2>
                        </header>
                        <figure>
                            <img src="${
                              show.show.image
                                ? show.show.image.medium
                                : "./image_not_available.jpeg"
                            }" alt="${show.title}">
                            <figcaption>${
                              show.show.image ? show.show.name : ""
                            }</figcaption>
                        </figure>
                        <p>${show.show.summary ? show.show.summary : ""}</p>
                        <a href="${show.show.officialSite}">${
        show.show.officialSite ? "Official Site" : ""
      }</a>
                      </article>`;
    });
};
