// import dependencies
var express = require('express');
var router = express.Router();
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var uuid = require('../util/uuid');
var guard = require('../middleware/guardMiddleware');
var cloudinary = require('cloudinary')

// import models
var User = require('../models/user');
var Post = require('../models/post');

// setup multer to upload photo to ./uploads/
var upload = multer({ dest: "./uploads/" });

// create new post
router.post('/', upload.single("file"), function(req, res, next) {
	// create an id for the post using UUID
	const id = uuid();

	// get the current path of the uploaded file from multer
	const tempPath = req.file.path;

	// get the path extension to the file uploaded, so we can check it's an image
	const extension = path.extname(req.file.originalname).toLowerCase();

	// check that the extension is either png or jpg
	if (extension !== ".png" && extension !== ".jpg") {
		console.log("Not an image")
		// if the file is not an image, remove it and send error
		fs.unlink(tempPath, err => {
			// if there was an error with remove image, handle
			if (err) {
				return next(err);
			};

			// tell ther user that we only allow images
			var err = new Error('Only .png or .jpg files are allowed!');
	        err.status = 403;
	        return next(err);
		});
	}

	// get the environment, falling back to development if there is none specified
	var env = process.env.NODE_ENV || 'dev';

	// if we are in development, we need to store the file locally, otherwise we upload it to a storage solution
	if (env === "production") {
		cloudinary.v2.uploader.upload(tempPath, function(err, result) {
			// if there is an rename error, handle
			if (err) {
				return next(err);
			};

			// get the url from the result object
			var url = result.url

			// get the user id and username from the session
			var owner = req.session.userID;
			var username = req.session.username;

			// get the post input
			var postInput = {
				owner: owner,
				imageURL: url,
				title: req.body.title,
				body: req.body.body,
				createdAt: new Date(),
				likes: 0,
				username: username
			};

			// store the post in the database
			Post.create(postInput, function (error, post) {
				if (error) {
					return next(error);
				} else {
					// if all is success, redirect to the newly created post
					return res.redirect("/feed/" + post._id);
				};
			});
		});

	} else {
		// set the target file name (path) for the image. It will be in the upload folder,
		// named after the post id + the extension (e.g. .png or .jpg)
		const targetPath = "./uploads/" + id + extension;

		// rename the file to the correct name (multer sets up an tempory file name)
		fs.rename(tempPath, targetPath, err => {

			// if there is an rename error, handle
			if (err) {
				return next(err);
			};

			// get the user id and username from the session
			var owner = req.session.userID;
			var username = req.session.username;

			// get the post input
			var postInput = {
				owner: owner,
				imageURL: "/uploads/" + id + extension,
				title: req.body.title,
				body: req.body.body,
				createdAt: new Date(),
				likes: 0,
				username: username
			};

			// store the post in the database
			Post.create(postInput, function (error, post) {
				if (error) {
					return next(error);
				} else {
					// if all is success, redirect to the newly created post
					return res.redirect("/feed/" + post._id);
				};
			});
		});
	};
});

module.exports = router;
