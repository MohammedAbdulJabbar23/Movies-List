fetch = require('node-fetch');
const catchAsync = require('../utils/asyncHandle');
const ExpressError = require('./ExpressError');

const apiKey = '8a5dae0dd85e45f838e3082c70a5a3d5';


const searchMovieByName= catchAsync(async (title)=>{
    const url = `https://api.themoviedb.org/3/search/movie?query=${title}`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTVkYWUwZGQ4NWU0NWY4MzhlMzA4MmM3MGE1YTNkNSIsInN1YiI6IjY0YmE5M2E0NGQyM2RkMDBjODE0YTBjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nqcClj4z4IrhtB2HVsxvzBZ88-JK3Hqna4jew0jYWwo'
    }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    } catch (err) {
      new ExpressError('Something went Wrong', 404)

    }
})

const baseURL = 'https://api.themoviedb.org/3';

const searchMovieById = async function findMovieById(movieId) {
    try {
      const response = await fetch(`${baseURL}/movie/${movieId}?api_key=${apiKey}`);
      const data = await response.json();
      // console.log(data.credits.cast);
      return data;
    } catch (error) {
      new ExpressError('Something went wrong', 404)
    }
}
const getMovieCast = async (movieId) =>{
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits`;

  try {
    const response = await fetch(url);
    const movieData = await response.json();
    const cast = movieData.credits.cast;
    return cast;
  } catch (error) {
    new ExpressError('Something went Wrong', 404)
  }
}
const getMovieByCastId = async (castId)=>{
  const url = `https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url);
    const castData = await response.json();
    const movies = castData.cast;
    return movies;
  } catch (error) {
    new ExpressError('Something went Wrong', 404)

  }
}
const getActorById = async function getActorById(actorId) {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}`);
      const data = await response.json();
      return data;
    } catch (error) {
      new ExpressError('Something went Wrong', 404)
    }
  }

module.exports = {
    searchMovieById,
    searchMovieByName,
    getMovieCast,
    getMovieByCastId,
    getActorById
};