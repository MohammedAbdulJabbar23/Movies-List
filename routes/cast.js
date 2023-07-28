const express = require('express');
const router = express.Router();
const searchMovie = require("../utils/searchMovie");
const catchAsync = require('../utils/asyncHandle');



/* GET home page. */
router.get('/:id',catchAsync( async  (req, res)=> {
    const {id} = req.params;
    const movies = await searchMovie.getMovieByCastId(id);
    const actor = await searchMovie.getActorById(id);
    console.log(actor);
    res.render("cast",{movies,actor});
}));

router.get("/:id", async (req,res)=>{
  const {id} = req.params;
  console.log(id);
  const movie = await searchMovie.searchMovieById(id);
  const cast = await searchMovie.getMovieCast(id);
  console.log(cast);
  res.render("show",{movie,cast});
});



module.exports = router;
