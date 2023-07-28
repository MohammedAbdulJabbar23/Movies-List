const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const searchMovie = require("../utils/searchMovie");
const getPopularMovies = require("../utils/getPopularMovies");
const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utils/asyncHandle');
const User = require("../models/user");


/* GET home page. */
router.get('/', catchAsync(async (req, res, next)=> {
  const popularMovies = await getPopularMovies();
  console.log(popularMovies)
  res.render('index', { popularMovies });
}));

router.get("/search", catchAsync(async (req,res)=>{
  const {title} = req.query;
  const movies = await searchMovie.searchMovieByName(title);
  res.render("searched",{movies: movies.results});
}));

router.post("/add/:id",isLoggedIn,(req,res)=>{
  const {id} = req.params;
  if(!req.isAuthenticated()){
    return res.redirect("/login");
  };
  console.log(id);
  res.send(id);
});

router.get("/remove/watchlist/:id",isLoggedIn,catchAsync(async(req,res)=>{
  const {id} = req.params;
  const user = await User.findById(req.user.id);

  if (user.watchlist.includes(id)) {
    user.watchlist.remove(id);
  }else{
    return res.redirect("/movie/" + id)
  }
  await user.save();
  res.redirect("/movie/" + id);
}))


module.exports = router;
