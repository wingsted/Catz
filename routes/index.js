// import dependencies
var express = require('express');
var router = express.Router();

// import models
var User = require('../models/user');

// get the index (home) page
router.get('/', function(req, res, next) {
    // if the user is already signed in, redirect to /feed
    if (req.session && req.session.userID) {
        return res.redirect('/feed');
    };

    // else render home page
    return res.render('index');
});

// get the sign up page
router.get('/signup', function(req, res, next) {
    // if the user is already signed in, redirect to /feed
    if (req.session && req.session.userID) {
        return res.redirect('/feed');
    };

    // else render sign up page
    return res.render('signup');
    //var error = req.query.error
    //return res.render('signup', { error: error });
});

// post the sign up data and handle
router.post('/signup', function(req, res, next) {
    // get the properties from the post body request as defined in our pug file
    var username = req.body.username;
    var email = req.body.email;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = req.body.password;

    //check if all fields are filled out
    if (username && email && firstname && lastname && password) {

        // create an object with input that user filled out in our signup.pug file.
        var userInput = {
            username: username,
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password
        };

        //use schema's create-method to insert document(userinput combined) into Mongo
        User.create(userInput, function (error, user) {
            if (error) {
                return next(error);
            } else {
                // following line of code logs in the user at the same time of creation.
                req.session.userID = user._id;
                // go to user area (feed)
                return res.redirect('feed');
            }
        })
    }
})



// get the sign in page
router.get('/signin', function(req, res, next) {
    // if the user is already signed in, redirect to /feed
    if (req.session && req.session.userID) {
        return res.redirect('/feed');
    };

    // else render sign in page
    return res.render('signin');
});

// post the sign in data and handle
router.post('/signin', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
        //invoke 'authenticate' method on the user object. authenticate is is created in the user.js file.
        User.authenticate(username, password, function (error, user) {
            // check if we have an error with authenticate ( email of password doesnt match) or if user doesnt exist in our DB.
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                // If we reach this point the user input is authenticated, and we give the user a session ID and saves it to the user ID ( _id is created in MongoDB)..
                // we create a property (userId), and sets its value. Then we tell Express add the property of the session or create new session if it doesnt exist.
                req.session.userID = user._id;
                // go to user area (feed), since the user is succesfully logged in at this point.
                return res.redirect('/feed');
            }
        });
    } else {
        var err = new Error('Email and password are required.');
        err.status = 401;
        return next(err);
    }
});

// sign the user out, and redirect to index
router.get('/signout', function(req, res, next) {
    // destroy the session
    req.session.destroy(function(err) {

        // if there is an error, handle
        if (err) {
            return next(err);
        } else {
            // return to index
            return res.redirect('/');
        }
    });
});

module.exports = router;
