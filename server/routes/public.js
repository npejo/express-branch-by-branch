// load dependencies
var express = require('express');
var router = express.Router();
var path = require('path');

// load middleware
var authMiddleware = require('../middleware/authentication');

/* GET / - home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express Branch by Branch'});
});

/* GET /tour - sign in page. */
router.get('/tour', function (req, res) {
    res.render('tour', {title: 'Features Tour - Demo Todo', active_tour: true});
});

/* GET /about - sign in page. */
router.get('/about', function (req, res) {
    res.render('about', {title: 'About - Demo Todo', active_about: true});
});

/* GET /register - new user register page. */
router.get('/register', function (req, res) {
    res.render('register', {title: 'Register'});
});

/* GET /app - Serve the app for logged users */
router.get('/app', authMiddleware.redirectNotAuthenticated, function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

module.exports = router;
