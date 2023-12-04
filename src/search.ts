// const url = 'https://movies-api14.p.rapidapi.com/search?query=breaking%20bad';
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '739f73b89amshc5865ff2d198483p1f8f8cjsn941822cca2a8',
//         'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
//     }
// };




interface Item {
    title: string;
    backdrop_path: string;
    _id: string;
}


function performSearch() {
    //console.log('Search button clicked!');
    const query = document.getElementById('search') as HTMLInputElement;
    const queryValue = query.value;

    const searchUrl = `https://movies-api14.p.rapidapi.com/search?query=${encodeURIComponent(queryValue)}`;

    //console.log('Search URL:', searchUrl);

    // Clear input search
    const movieCardsSelector = document.querySelector('.movie-cards') as HTMLElement;
    movieCardsSelector.innerHTML = '';

    try {
        fetch(searchUrl, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const results = data.contents || [];

                if (results.length === 0) {
                    //console.log('No results found.');
                    return;
                }


                results.map((item:Item) => {
                    const movieName:string = item.title;
                    const img:string = item.backdrop_path ? item.backdrop_path : 'default-image-url';
                    const movie:string = `<li><img src="${img}"><h2>${movieName}</h2></li>`;
                    movieCardsSelector.innerHTML += movie;
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    } catch (error) {
        console.error(error);
    }


    const search = document.getElementById('search') as HTMLInputElement;
    search.value = '';
}

const searchBtn = document.getElementById('search-btn') as HTMLButtonElement;
searchBtn.addEventListener('click', performSearch);



