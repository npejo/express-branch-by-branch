'use strict';

module.exports = function(config, app, passport) {
    var routesPath = config.root + '/server/routes';

    // load middleware
    var authMiddleware = require(config.root + '/server/middleware/authentication');

    var appRouter = require(routesPath + '/app')(config, passport);
    var publicRouter = require(routesPath + '/public')(config, passport);
    var todosRouter = require(routesPath + '/todos')(config, passport);

    app.use('/', [publicRouter, appRouter]);
    app.use('/api', authMiddleware.checkAuthenticated, todosRouter);
};

