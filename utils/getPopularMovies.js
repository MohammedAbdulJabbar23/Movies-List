const catchAsync = require('../utils/asyncHandle');
fetch = require('node-fetch');
const apiKey = ""; //put your api key 

module.exports = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;


    try {
        const response = await fetch(url);
        const movieData = await response.json();
        const top100PopularMovies = movieData.results.slice(0, 100);
        return top100PopularMovies;
    } catch (error) {
        new ExpressError('Something went Wrong', 404)

    }

};
