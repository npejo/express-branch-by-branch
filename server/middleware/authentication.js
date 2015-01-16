'use strict';

exports.checkAuthenticated = function (req, res, next) {
    var authenticated = false;
    if (authenticated) return next();
    res.json(401, 'Unauthorized');
};

exports.redirectNotAuthenticated = function(req, res, next) {
    var authenticated = true;
    if (authenticated) return next();
    res.redirect('/');
};