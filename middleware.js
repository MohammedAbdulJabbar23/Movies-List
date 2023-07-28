module.exports.isLoggedIn = (req,res,next) =>{
    console.log("req.user.. ", req.user)
    if(!req.isAuthenticated()){
        // req.flash("error", "You must login first!");
        return res.redirect("/login");
    }
    next();
};