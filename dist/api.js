"use strict";
const url = "https://movies-api14.p.rapidapi.com/shows";
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "739f73b89amshc5865ff2d198483p1f8f8cjsn941822cca2a8",
        "X-RapidAPI-Host": "movies-api14.p.rapidapi.com",
    },
};
// Get movies
fetch(url, options)
    .then((response) => response.json())
    .then(({ movies }) => {
    // all movies
    // console.log(data)
    const results = movies || [];
    const movieCardsContainer = document.querySelector(".movie-cards");
    results.map(({ title: movieName, backdrop_path: img, _id: movieId }) => {
        const movieCard = document.createElement("li");
        movieCard.innerHTML = `
                <img src="${img}" alt="${movieName}">
                <h2>${movieName}</h2>
                `;
        const detailsButton = document.createElement("button");
        detailsButton.innerText = "Details";
        detailsButton.addEventListener("click", () => {
            openModal(movieId);
        });
        movieCard.appendChild(detailsButton);
        movieCardsContainer.appendChild(movieCard);
    });
}).catch(console.error);
// Home btn from Navbar refresh the page
const homeLink = document.getElementById("home-link");
homeLink.addEventListener("click", () => { location.reload(); });
// Details
function closeModal() {
    //console.log('closeModal function called');
    const modal = document.getElementById("movieModal");
    if (modal)
        modal.style.display = "none";
    const main = document.querySelector(".main-content");
    if (main)
        main.classList.remove("modal-open");
}
function openModal(movieId) {
    const modal = document.getElementById("movieModal");
    const modalTitle = document.querySelector(".modal-title");
    const modalImg = document.querySelector(".modal-img");
    const modalDescription = document.querySelector(".description");
    const modalYear = document.querySelector(".year");
    const detailsUrl = `https://movies-api14.p.rapidapi.com/show/${movieId}`;
    fetch(detailsUrl, options)
        .then((response) => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
        .then((movieDetails) => {
        const title = movieDetails.show.title;
        const img = movieDetails.show.poster_path;
        const description = movieDetails.show.overview;
        const year = movieDetails.show.first_aired;
        modalTitle.innerText = title;
        modalImg.src = img;
        modalDescription.innerText = description;
        modalYear.innerText = year;
        modal.style.display = "block";
        const main = document.querySelector(".main-content");
        main === null || main === void 0 ? void 0 : main.classList.add("modal-open");
    })
        .catch((error) => {
        console.error("Error fetching movie details:", error);
    });
}
document.addEventListener("click", ({ target: clickedItem }) => {
    console.log("eventTarget", clickedItem);
    const doClose = [".modal", ".modal-title", ".modal-img", ".modal-content", ".description", ".year"]
        .every(selector => document.querySelector(selector) !== clickedItem);
    if (doClose)
        closeModal();
});
