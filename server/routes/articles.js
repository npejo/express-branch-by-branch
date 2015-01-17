// load dependencies
var express = require('express');
var router = express.Router();

// load middleware
var authMiddleware = require('../middleware/authentication');

// load controllers
var articlesCtrl = require('../controllers/articles');

/* GET /articles - list of all articles */
router.get('/', authMiddleware.checkAuthenticated, function (req, res) {
    var articles = articlesCtrl.getArticles();
    res.json(articles);
});

module.exports = router;
