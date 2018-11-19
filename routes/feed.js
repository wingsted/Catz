// import dependencies
var express = require('express');
var router = express.Router();

// get the feed page
router.get('/', function(req, res, next) {
  return res.render('feed');
});

module.exports = router;
