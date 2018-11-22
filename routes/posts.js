// import dependencies
var express = require('express');
var router = express.Router();
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var uuid = require('../util/uuid');

// import models
var User = require('../models/user');
var Post = require('../models/post');

// setup multer to upload photo to ./uploads/
var upload = multer({ dest: "./uploads/" });

// get the posts
router.get('/', function(req, res, next) {
	var owner = new User("mikkelu", "mik", "ul", "password", "email")
	var post = new Post(owner, "../img/homeCover.png", "EXAMPLE TITLE", "What body?", 1, 1)
	var post2 = new Post(owner, "../img/homeCover.png", "EXAMPLE TITLE 2", "What body 2?", 1, 1)
	var posts = [post, post2]
	res.setHeader('Content-Type', 'application/json');
	return res.send(JSON.stringify(posts));
});

// create new post
router.post('/', upload.single("file"), function(req, res, next) {
	// create an id for the post using UUID
	const id = uuid();

	// get the current path of the uploaded file from multer
	const tempPath = req.file.path;

	// get the path extension to the file uploaded, so we can check it's an image
	const extension = path.extname(req.file.originalname).toLowerCase();

	// set the target file name (path) for the image. It will be in the upload folder,
	// named after the post id + the extension (e.g. .png or .jpg)
	const targetPath = "./uploads/" + id + extension;

	// check that the extension is either png or jpg
	if (extension === ".png" || extension === ".jpg") {

		// rename the file to the correct name (multer sets up an tempory file name)
		fs.rename(tempPath, targetPath, err => {

			// if there is an rename error, handle
			if (err) {
				// FIXME
				return res.send(err);
			};

			// get the user from the session
			// FIXME
			var owner = new User("mikkelux", "mik", "ul", "password", "email");

			// store the post in the database
			// FIXME
			var post = new Post(id, owner, targetPath, req.body.title, req.body.body);

			// if all is success, redirect to the newly created post
			return res.redirect("/feed/" + id);
		});
	} else {
		// if the file is not an image, remove it and send error
		fs.unlink(tempPath, err => {
			// if there was an error with remove image, handle
			if (err) {
				// FIXME
				return res.send(err);
			};

			// tell ther user that we only allow images
			return res.status(403).contentType("text/plain").end("Only .png or .jpg files are allowed!");
		});
	};
});

module.exports = router;
