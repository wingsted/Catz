// import dependencies
var express = require('express');
var router = express.Router();
var http = require("http");

// import models
var User = require('../models/user');
var Post = require('../models/post');

// get the feed page
router.get('/', function(req, res, next) {
    // get the posts
    // FIXME

    // return the template with posts
    // FIXME: update the pug template to handle this and remove frontend js
    return res.render('feed');
});

// upload new post
router.get('/new', function(req, res, next) {
    return res.render('new')
});

// get a specific post page from id
router.get('/:id', function(req, res, next) {
    // get the post id from the URI
    var postID = req.params.id;

    // fetch the post in the DB
    // FIXME
    var owner = new User("mikkelux", "mik", "ul", "password", "email")
    var post = new Post(owner, "../img/homeCover.png", "EXAMPLE TITLE", "What body?", 1, [1])

    // return the post page with the post object
    return res.render('post', { imageURL: post.imageURL, title: post.title, userName: post.owner.userName, body: post.body, likes: post.likes, comments: post.comments })
});

module.exports = router;
