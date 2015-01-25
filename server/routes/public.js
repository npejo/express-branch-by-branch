// load dependencies
var express = require('express');
var router = express.Router();

module.exports = function(config) {
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

    return router;
};