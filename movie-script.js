const moviesList = document.querySelector(".movies")
const categories = document.querySelectorAll(".categories li")
const key = '9de90cd572615203d991274e9147bb20';
const imageURL = 'https://www.themoviedb.org/t/p/w440_and_h660_face';


const updatePopularMovies = (movies) => {
    categories.forEach((category) => {
        category.addEventListener('click', (e) => {
            if (category.className === 'all') {
                movies.filter(movie => {
                    const html = `
                    <div class="movies-div">
                        <h3 class="movie-title">${movie.title}</h3>
                        <img src="${imageURL + movie.poster_path}" alt="movie-image" height="377" width="379">
                    </div>
                    `;
                
                    moviesList.innerHTML += html;
                });
            } 
        })
    }) 
}

const updateUpcomingMovies = (movies) => {
    categories.forEach((category) => {
        category.addEventListener('click', (e) => {
            if (category.className === 'new-movies') {
                movies.filter(movie => {
                    const html = `
                    <div class="movies-div">
                        <h3 class="movie-title">${movie.title}</h3>
                        <img src="${imageURL + movie.poster_path}" alt="movie-image" height="377" width="379">
                    </div>
                    `;
                    moviesList.innerHTML += html;
                }); 
            } 
        })
    }) 
}


const getPopularMovies = async () => {
    const moviePart = 'https://api.themoviedb.org/3/movie/popular';
    const base = `?api_key=${key}`;
    const lang = '&language=en-US&page=1'

    const response = await fetch(moviePart + base + lang);
        
    if (response.status !== 200) {
        throw new Error('This is an error message here');
    } 

    const data = response.json()
    return data;

}

getPopularMovies()
    .then((data) => updatePopularMovies(data.results))
    .catch((err) => console.log("cant find movie " + err))


const getUpcomingMovies = async () => {
    const moviePart = 'https://api.themoviedb.org/3/movie/upcoming';
    const base = `?api_key=${key}`;
    const lang = '&language=en-US&page=1'

    const response = await fetch(moviePart + base + lang);
        
    if (response.status !== 200) {
        throw new Error('This is an error message here');
    } 

    const data = response.json()
    return data;

}

getUpcomingMovies()
    .then((data) => updateUpcomingMovies(data.results))
    .catch((err) => console.log("cant find movie " + err))