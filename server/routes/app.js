'use strict';

// load dependencies
var express = require('express');
var router = express.Router();

module.exports = function(config, passport) {
    // load middleware
    var authMiddleware = require(config.root + '/server/middleware/authentication');

    /* GET /app - Serve the app for logged users */
    router.get(config.appUrl, authMiddleware.redirectNotAuthenticated, function (req, res) {
        res.sendFile(config.root + '/client/index.html');
    });

    return router;
};
