'use strict';

// load dependencies
var express = require('express');
var router = express.Router();

module.exports = function(config, passport) {
    /* GET / - home page. */
    router.get('/', function (req, res) {
        console.log(req.flash());
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

    /* POST /signin - existing user login attempt. */
    router.post('/signin', passport.authenticate('local', {
            successRedirect: config.appUrl,
            failureRedirect: '/',
            failureFlash: true
        })
    );

    /* POST /register - new user register page. */
    router.post('/register', passport.authenticate('local', {
            successRedirect: config.appUrl,
            failureRedirect: '/register'
        })
    );

    return router;
};