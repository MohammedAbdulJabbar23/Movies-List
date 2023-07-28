const express = require('express');
const router = express.Router();
const searchMovie = require("../utils/searchMovie");
const { isLoggedIn } = require('../middleware');
const User = require("../models/user");
const catchAsync = require('../utils/asyncHandle');


/* GET home page. */


router.get("/watchlist/:id",isLoggedIn, catchAsync(async (req,res)=>{
  const {id} = req.params;
  const user = await User.findById(req.user.id);

  if (!user.watchlist.includes(id)) {
    user.watchlist.push(id);
  }else{
    return res.redirect("/movie/" + id)
  }
  await user.save();
  res.redirect("/movie/" + id);
}));

module.exports = router;
