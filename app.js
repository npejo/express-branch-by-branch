var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var publicRouter = require('./server/routes/public');
var todosRouter = require('./server/routes/todos');
var appRouter = require('./server/routes/app');
var app = express();

// setup handlebars as view engine
app.set('views', path.join(__dirname, 'server/site/views'));
app.set('view engine', 'hbs');

// register view partials directory
hbs.registerPartials(path.join(__dirname, 'server/site/views/partials'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set the directories from which the static content is served
// static content related to the public website
app.use(express.static(path.join(__dirname, 'server/site/public')));

// static content related to the frontend single page application
app.use(express.static(path.join(__dirname, 'client'), {index: ''}));

app.use('/', [publicRouter, appRouter]);
app.use('/api', todosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
