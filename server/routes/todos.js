'use strict';

// load dependencies
var express = require('express');
var router = express.Router();

module.exports = function(config, passport) {
    // load controllers
    var todoCtrl = require(config.root + '/server/controllers/todos');

    /* GET /todos - list of all todos for logged user */
    router.get('/todos', function (req, res) {
        var todo = todoCtrl.getTodosByUser();
        res.json(todo);
    });

    return router;
};