module.exports = function() {

    var passport = require('passport');
    var localStrategy = require('passport-local');
    var User = require('../models/User.js');
    var bcrypt = require('bcrypt');

    // takes a function that validates user
    passport.use(new localStrategy.Strategy({usernameField:'email'},function (email, password, next) {

        User.findOne({'email': new RegExp(email, "i")}, function (err, user) {

            if (err) {
                return next(err); // error
            }
            if (!user) {
                return next(null, null); // no error, no user
            }
            bcrypt.compare(password, user.password, function(err,same){
                if(err){
                    return next(err);
                }
                if(!same){
                    return (null, null); // no err, no user
                }
                next(null,user); // no err, valid userW
            });
        });
    }));

    // serializes a users mail into the session cookie
    passport.serializeUser(function (user, next) {
        next(null, user.email);
    });

    // deserializing the email from session coocie, and finds the user in db
    passport.deserializeUser(function (email, next) {
        User.findOne({'email': new RegExp(email, "i")}, function(err,user){
            next(err,user);
        });
    });


};


