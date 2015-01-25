// load dependencies
var express = require('express');
var router = express.Router();

module.exports = function(config) {
    // load middleware
    var authMiddleware = require(config.root + '/server/middleware/authentication');

    /* GET /app - Serve the app for logged users */
    router.get('/app', authMiddleware.redirectNotAuthenticated, function (req, res) {
        res.sendFile(config.root + '/client/index.html');
    });

    return router;
};
