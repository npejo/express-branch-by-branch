'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    oAuthTypes = ['github'];

/**
 * User Schema
 */

var UserSchema = new Schema({
    name: { type: String, default: ''},
    email: { type: String, default: ''},
    provider: { type: String, default: '' },
    hashedPassword: { type: String, default: '' }
});

/**
 * Virtuals
 */

UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });


var validatePresenceOf = function (value) {
    return value && value.length;
};

/**
 * Validations
 */

// the validations below only apply if you are signing up with email and password
UserSchema.path('name').validate(function (name) {
    if (this.doesNotRequireValidation()) return true;
    return name.trim().length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
    if (this.doesNotRequireValidation()) return true;
    return email.trim().length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function (email, fn) {
    var User = mongoose.model('User');
    if (this.doesNotRequireValidation()) fn(true);

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
        // verify that the email is not already used by other users
        User.find({ email: email }).exec(function (err, users) {
            fn(!err && users.length === 0);
        });
    } else fn(true);
}, 'Email already exists');

UserSchema.path('hashedPassword').validate(function (hashedPassword) {
    if (this.doesNotRequireValidation()) return true;
    return hashedPassword.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.password) &&
        !this.doesNotRequireValidation()) {
        next(new Error('Invalid password'));
    } else {
        next();
    }
});

/**
 * Methods
 */

UserSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */

    authenticate: function (plainText) {
        return bcrypt.compareSync(plainText, this.hashedPassword);
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */

    encryptPassword: function (password) {
        if (!password) return '';
        var encrypted;
        try {
            encrypted = bcrypt.hashSync(password);
            return encrypted;
        } catch (err) {
            return '';
        }
    },

    /**
     * Validation is not required if using OAuth
     */

    doesNotRequireValidation: function() {
        return ~oAuthTypes.indexOf(this.provider);
    }
};

mongoose.model('User', UserSchema);
