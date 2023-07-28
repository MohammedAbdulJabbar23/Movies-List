const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejsMate = require("ejs-mate");
const session = require("express-session");
const passport = require("passport");
const LocalStraregy = require("passport-local");
const User = require("./models/user");
const mongoose = require("mongoose");
const {isLoggedIn } = require("./middleware");
const ExpressError = require('./utils/ExpressError');
const flash = require('connect-flash');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const movieRouter = require("./routes/movie");
const castRouter = require("./routes/cast");
const addMovieRouter = require("./routes/addMovies");

const app = express();
//mongoose connect
mongoose.connect("mongodb://localhost:27017/movie-app",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
  console.log("Database connected");
})
// session configeration
const sessionConfig = {
  secret: "itshouldbeabettersecretbutwhatever",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000*60*60*24*7,
    maxAge: 1000*60*60*24*7
  }
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser('secret'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine("ejs",ejsMate);
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStraregy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success'); // Add success flash messages to res.locals
  res.locals.error = req.flash('error'); // Add error flash messages to res.locals
  next();
});

app.use((req,res,next)=>{
  res.locals.currentUser = req.user;
  next();
})

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use("/movie",movieRouter);
app.use("/cast", castRouter)
app.use("/add",addMovieRouter);


app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
