var express = require('express');
var router = express.Router();
var path = require('path');

var authMdlware = require('../middleware/authentication');

var articlesCtrl = require('../controllers/articles');

/* GET home page. */
router.get('/', function (req, res) {
    var articles = articlesCtrl.getArticles();
    res.render('index', {title: 'Express Branch by Branch', articles: articles});
});

router.get('/signin', function (req, res) {
    res.render('signin', {title: 'Sign in'});
});

router.get('/app', authMdlware.redirectNotAuthenticated, function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

module.exports = router;
