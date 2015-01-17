// load dependencies
var express = require('express');
var router = express.Router();

// load middleware
var authMiddleware = require('../middleware/authentication');

// load controllers
var todoCtrl = require('../controllers/todos');

/* GET /articles - list of all articles */
router.get('/', authMiddleware.checkAuthenticated, function (req, res) {
    var todo = todoCtrl.getTodosByUser();
    res.json(todo);
});

module.exports = router;
