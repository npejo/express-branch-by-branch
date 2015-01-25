'use strict';

var mongoose = require('mongoose');

module.exports = function(config) {
    // Connect to mongodb
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    var db = mongoose.createConnection(config.db, options);

    // Error handler
    mongoose.connection.on('error', function (err) {
        console.log(err);
    });

    return db;
};