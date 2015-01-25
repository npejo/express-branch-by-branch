'use strict';

// load dependencies
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var compression = require('compression');
var hbs = require('hbs');

module.exports = function (config, dbConnection) {
    var app = express();

    // use gzip compression, should be placed before express.static
    app.use(compression());

    // setup handlebars as view engine
    app.set('views', config.root + '/server/site/views');
    app.set('view engine', 'hbs');

    // register view partials directory
    hbs.registerPartials(config.root + '/server/site/views/partials');

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    // set the directories from which the static content is served
    // static content related to the public website
    app.use(express.static(config.root + '/server/site/public'));

    // static content related to the frontend single page application
    app.use(express.static(config.root + '/client', {index: ''}));

    // Setup express session, use mongodb as session storage
    app.use(session({
            secret: config.sessionSecret,
            store: new mongoStore({
                mongooseConnection: dbConnection,
                collection : config.sessionCollection
            }),
            resave: false,
            saveUninitialized: false
        }
    ));

    // connect-flash middleware for flash messages - should be declared after session initialization
    app.use(flash());

    //Setup routes
    require('./routes.config')(config, app);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    return app;
};
