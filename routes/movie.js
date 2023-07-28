const express = require('express');
const router = express.Router();
const searchMovie = require("../utils/searchMovie");
const catchAsync = require('../utils/asyncHandle');


/* GET home page. */


router.get("/:id",catchAsync( async (req,res)=>{
  const {id} = req.params;
  let isInWatchList = true;
  if(req.user){
    const userWatchList = req.user.watchlist;
    isInWatchList = userWatchList.includes(id)? true: false;

  }
  const movie = await searchMovie.searchMovieById(id);
  const cast = await searchMovie.getMovieCast(id);
  res.render("show",{movie,cast,isInWatchList});
}));


module.exports = router;
