const url = "https://movies-api14.p.rapidapi.com/shows";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "739f73b89amshc5865ff2d198483p1f8f8cjsn941822cca2a8",
    "X-RapidAPI-Host": "movies-api14.p.rapidapi.com",
  },
};


interface Item {
    title: string;
    backdrop_path: string;
	_id: string;
}

// Get movies
try {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      // all movies
      // console.log(data)
      const results = data.movies;

      const movieCardsContainer = document.querySelector(".movie-cards") as HTMLInputElement;

      results.map((item:Item) => {
        const movieName:string = item.title;
        const img:string = item.backdrop_path;
        const movieId:string = item._id;

        const movieCard = document.createElement("li");
        movieCard.innerHTML = `
                <img src="${img}" alt="${movieName}">
                <h2>${movieName}</h2>
                `;

        const detailsButton = document.createElement("button");
        detailsButton.innerText = "Details";
        detailsButton.addEventListener("click", function () {
          //console.log('Clicked on Details button for movieId:', movieId);
          openModal(movieId);
        });

        movieCard.appendChild(detailsButton);
        movieCardsContainer.appendChild(movieCard);
      });
    });
} catch (error) {
  //console.error(error);
}

// Home btn from Navbar refresh the page
const homeLink = document.getElementById("home-link") as HTMLInputElement;
homeLink.addEventListener("click", function () {
  location.reload();
});

// Details
function closeModal() {
  //console.log('closeModal function called');
  const modal = document.getElementById("movieModal") as HTMLInputElement;
  modal.style.display = "none";

  const main = document.querySelector(".main-content") as HTMLInputElement;
  main.classList.remove("modal-open");
}

function openModal(movieId:string) {
  const modal = document.getElementById("movieModal")as HTMLInputElement;
  const modalTitle = document.querySelector(".modal-title") as HTMLInputElement;
  const modalImg = document.querySelector(".modal-img") as HTMLInputElement;
  const modalDescription = document.querySelector(".description") as HTMLInputElement;
  const modalYear = document.querySelector(".year") as HTMLInputElement;

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

      const main = document.querySelector(".main-content") as HTMLElement;
      main.classList.add("modal-open");
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
    });
}

document.addEventListener("click", function (event) {
  const clickedItem = event.target;
  console.log("eventTarget", clickedItem);

  const targetOuterdiv = document.querySelector(".modal") as HTMLElement;
  const targetTitle = document.querySelector(".modal-title") as HTMLElement;
  const targetImg = document.querySelector(".modal-img") as HTMLElement;
  const targetModalContent = document.querySelector(".modal-content") as HTMLElement;
  const targetDescription = document.querySelector(".description") as HTMLElement;
  const targetYear = document.querySelector(".year") as HTMLElement;

  if (
    clickedItem !== targetOuterdiv &&
    clickedItem !== targetTitle &&
    clickedItem !== targetImg &&
    clickedItem !== targetModalContent &&
    clickedItem !== targetDescription &&
    clickedItem !== targetYear
  ) {
    closeModal();
  }
});
