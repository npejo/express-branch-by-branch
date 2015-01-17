// load dependencies
var express = require('express');
var router = express.Router();
var path = require('path');

// load middleware
var authMiddleware = require('../middleware/authentication');

/* GET /app - Serve the app for logged users */
router.get('/app', authMiddleware.redirectNotAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

module.exports = router;