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
// POST     /posts          -> create a new post
// POST     /posts/ID/like  -> like a post

// start mongodb in docker: docker run --name mongodb bitnami/mongodb:latest -p 5432:5432 -d mongodb

// import dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

var MONGODB_URI = "mongodb://localhost:27017/catzdb"
if (process.env.MONGODB_URI) {
    MONGODB_URI = process.env.MONGODB_URI;
};

// connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true });

// add express-session module
app.use(session({
  secret: 'Catz',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
      mongooseConnection: mongoose.connection
  })
}));

// make sure we can access to user id in the pug templates
app.use(function(req, res, next) {
    res.locals.userID = req.session.userID;
    res.locals.username = req.session.username;
    next();
});

// serve static files from /public
app.use("/public", express.static(__dirname + '/public'));

// serve uploaded images from /uploads
app.use("/uploads", express.static(__dirname + '/uploads'));

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

// catch all errors and show error page
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// check if there is a port in the environment
const PORT = process.env.PORT || 3000;

// start listen on port 3000
app.listen(PORT, function () {
  console.log('Express app listening on port', PORT);
});
