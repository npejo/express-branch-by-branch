'use strict';

// load dependencies
var express = require('express');
var router = express.Router();

module.exports = function(config, passport) {
    // load controllers
    var Users = require(config.root + '/server/controllers/users');

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
        var errorMsg = req.flash('errorMsg')[0];
        res.render('register', {title: 'Register', errorMsg: errorMsg});
    });

    /* POST /signin - existing user login attempt. */
    router.post('/signin', passport.authenticate('local', {
            successRedirect: config.appUrl,
            failureRedirect: '/',
            failureFlash: true
        })
    );

    /* POST /register - new user register page. */
    router.post('/register', function(req, res) {
        Users.createUser(req.body, function(result) {
            console.log(result);
            return;
            if (result.status === 400) {
                //console.log(result.response);
                req.flash('errorMsg', 'Error message');
                res.redirect('/register');
            } else if (result.status === 201) {
                // manually create session once the user is successfully created
                res.json(result.response);
                return;
                req.logIn(result.response, function(err, next) {
                    if (err) return next(err);
                    return res.json(201, {user: result.response});
                });
            }
        });
    });

    return router;
};