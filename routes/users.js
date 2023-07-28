const express = require('express');
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const flash = require('connect-flash');
const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utils/asyncHandle');
const searchMovie = require("../utils/searchMovie");

//Register a user
router.get("/register",(req,res)=>{
  res.render("register");
});

router.post("/register", catchAsync(async (req,res)=>{
  try {
    const {email, username, password} = req.body;
    const user = new User({email,username});
    const registeredUser = await User.register(user,password);
    res.redirect("/");
  } catch (error) {
      res.redirect("/register");
  }

}));

router.get("/login",(req,res)=>{
  res.render("login");
})
// login routes
router.post("/login",passport.authenticate("local",{failureFlash:true,failureRedirect: "/login"}),(req,res)=>{
  res.redirect("/");
});

router.get("/logout",(req,res)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    // req.flash("success", "Goodbye!");
    res.redirect("/");
  });
})

// watch list movies
router.get("/mylist",isLoggedIn,catchAsync(async(req,res)=>{
  const movies = [];
  const user = await User.findById(req.user.id);
  const movieId = user.watchlist;
  for (const id of movieId) {
    const movie = await searchMovie.searchMovieById(id);
    if(movie){
      movies.push(movie);
    }
  }

  res.render("movielist",{movies});
}));


module.exports = router;
