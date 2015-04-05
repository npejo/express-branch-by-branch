'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.createUser = function(data, cb) {
    var user = new User(data);
    user.provider = 'local';

    var result = {
        status: '',
        response: ''
    };

    User.find(function(err, users) {
        console.log(users);
        cb(users);
    });
    //user.save(function (err) {
    //console.log(err);
    //    if (err) {
    //        result.status = 400;
    //        result.response = err.errors;
    //    } else {
    //        result.status = 201;
    //        result.response = user;
    //    }
    //    cb(result);
    //});
};