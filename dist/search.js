"use strict";
function performSearch() {
    //console.log('Search button clicked!');
    const { value: queryValue } = document.getElementById('search');
    const searchUrl = `https://movies-api14.p.rapidapi.com/search?query=${encodeURIComponent(queryValue)}`;
    // Clear input search
    const movieCardsSelector = document.querySelector('.movie-cards');
    movieCardsSelector.innerHTML = '';
    fetch(searchUrl, options)
        .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
        .then(({ contents: results }) => {
        if (!results || results.length === 0)
            return;
        results.map(({ title: movieName, backdrop_path }) => {
            const img = backdrop_path ? backdrop_path : 'default-image-url';
            const movie = `<li><img src="${img}"><h2>${movieName}</h2></li>`;
            movieCardsSelector.innerHTML += movie;
        });
    })
        .catch(error => {
        console.error('Error fetching data:', error);
    });
    document.getElementById('search').value = '';
}
document.getElementById('search-btn').addEventListener('click', performSearch);
