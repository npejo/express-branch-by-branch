module.exports = function(config, app) {
    var routesPath = config.root + '/server/routes';

    // load middleware
    var authMiddleware = require(config.root + '/server/middleware/authentication');

    var appRouter = require(routesPath + '/app')(config);
    var publicRouter = require(routesPath + '/public')(config);
    var todosRouter = require(routesPath + '/todos')(config);

    app.use('/', [publicRouter, appRouter]);
    app.use('/api', authMiddleware.checkAuthenticated, todosRouter);
};

