// import dependencies
var express = require('express');
var router = express.Router();

// import models
var User = require('../models/user');

// get the index (home) page
router.get('/', function(req, res, next) {
    return res.render('index');
});

// get the sign up page
router.get('/signup', function(req, res, next) {
    // if the user is already signed in, redirect to /feed
    // FIXME

    // else render sign up page
    var error = req.query.error
    return res.render('signup', { error: error });
});

// post the sign up data and handle
router.post('/signup', function(req, res, next) {
    // get the properties from the post body request as defined in our pug file
    var username = req.body.username;
    var email = req.body.email;
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var password = req.body.password;

    // check in the database that the username and email is not already taken
    // FIXME

    // hash and salt password
    // FIXME

    // create the user and store it in the database
    var user = new User(username, firstName, lastName, password, email)
    console.log(user)
    // FIXME

    // authenticate user and store session
    // FIXME

    // go to user area (feed)
    return res.redirect('/feed');
});

// get the sign in page
router.get('/signin', function(req, res, next) {
    // if the user is already signed in, redirect to /feed
    // FIXME

    // else render sign in page
    return res.render('signin');
});

// post the sign in data and handle
router.post('/signin', function(req, res, next) {
    // get the properties from the post body request as defined in our pug file
    var username = req.body.username;
    var password = req.body.password;

    // check the database for the user and password

    // if there is an error, show generic `wrong password/username combi`

    // authenticate user and store session
    // FIXME

    // go to user area (feed)
    return res.redirect('/feed');
});

module.exports = router;
