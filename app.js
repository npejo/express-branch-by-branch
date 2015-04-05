'use strict';

// load dependencies
var fileHelper = require('./server/helpers/file');

// Set the node environment variable if not set before, default: development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load app configuration for the current environment
var config = require('./server/config/app.config');

// Setup db connection
var dbConnection = require('./server/config/db.config')(config);

// Load models
fileHelper.loadDirModules(__dirname + '/server/models');

// Setup passport configuration
var passport = require(config.root + '/server/config/passport.config')(config);

// Setup Express application instance
var app = require(config.root + '/server/config/express.config')(config, dbConnection, passport);

module.exports = app;
