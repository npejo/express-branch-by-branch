// Set the node environment variable if not set before, default: development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load app configuration for the current environment
var config = require('./server/config/app.config');

// Setup db connection
var dbConnection = require('./server/config/db.config')(config);

// Setup Express application instance
var app = require('./server/config/express.config')(config, dbConnection);

module.exports = app;
