// load dependencies
var express = require('express');
var router = express.Router();
var path = require('path');

// load middleware
var authMiddleware = require('../middleware/authentication');

// load controllers
var articlesCtrl = require('../controllers/articles');

/* GET / - home page. */
router.get('/', function (req, res) {
    var articles = articlesCtrl.getArticles();
    res.render('index', {title: 'Express Branch by Branch', articles: articles});
});

/* GET /signin - sign in page. */
router.get('/signin', function (req, res) {
    res.render('signin', {title: 'Sign in'});
});

/* GET /app - blog administration. */
router.get('/app', authMiddleware.redirectNotAuthenticated, function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

module.exports = router;
