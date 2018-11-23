// all paths
// GET      /               -> get the index (home) page
// GET      /signup         -> get the sign up page
// POST     /signup         -> post the sign up data and handle
// GET      /signin         -> get the sign in page
// POST     /signin         -> post the sign in data and handle
// GET      /feed           -> get the feed page
// GET      /feed/ID        -> get single post page
// POST     /signout        -> signout the user and destroy session
// GET      /new            -> get the create new post form
// GET      /posts          -> get posts from db
// POST     /posts          -> create a new post
// GET      /posts/ID       -> get specific post
// POST     /posts/ID/like  -> like a post

// import dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var app = express();

//Use express-session module
app.use(session({
  secret: 'Catz',
  resave: true,
  saveUninitialized: false
}));

//mongoDB connection
mongoose.connect("mongodb://localhost:27017/catzdb", { useNewUrlParser: true, useCreateIndex: true });




// serve static files from /public
app.use(express.static(__dirname + '/public'));

// parse incoming requests, so we have access to the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// add the routes
var indexRoutes = require('./routes/index');
app.use('/', indexRoutes);
var feedRoutes = require('./routes/feed');
app.use('/feed', feedRoutes);
var postRoutes = require('./routes/posts');
app.use('/posts', postRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen on port 8080
app.listen(8080, function () {
  console.log('Express app listening on port 8080');
});
