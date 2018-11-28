// import dependencies
var express = require('express');
var router = express.Router();
var http = require("http");
var guard = require('../middleware/guardMiddleware');

// import models
var User = require('../models/user');
var Post = require('../models/post');

// get the feed page
router.get('/', guard.guardMiddleware, function(req, res, next) {
    // get the posts
    Post.find(function(error, posts) {
        if (error) {
            return next(error);
        }

        // return the template with posts
        return res.render('feed', { posts: posts});
    });
});

// upload new post
router.get('/new', guard.guardMiddleware, function(req, res, next) {
    return res.render('new')
});

// get a specific post page from id
router.get('/:id', guard.guardMiddleware, function(req, res, next) {
    // get the post id from the URI
    var postID = req.params.id;

    // fetch the post in the DB
    Post.findById(postID, function(error, post) {
        if (error) {
            return next(error);
        }

        // return the post page with the post object
        return res.render('post', { post: post })
    });
});

module.exports = router;
