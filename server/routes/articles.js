var express = require('express');
var router = express.Router();

var authMdlware = require('../middleware/authentication');

var articlesCtrl = require('../controllers/articles');

/* GET articles - list of all articles */
router.get('/', authMdlware.checkAuthenticated, function (req, res) {
    var articles = articlesCtrl.getArticles();
    res.json(articles);
});

module.exports = router;
