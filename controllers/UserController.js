/**
 * Created by arun on 10/27/15.
 */

var User = require('../models/User.js');

// adds a user and returns it with a uniqe id added, in the callback
exports.addUser = function(user,next){
    user.email = user.email.toLowerCase();
    var userModel = new User(user);

    userModel.save(function(err,user){
        if(err) {
            return next(err,null);
        }else{
            return next(null,user); // parsing user so we know what id mongo gave it after it is saved
        }
    });

};

// finds a user by email, case is ignored
exports.findUserByEmail = function(email, next){

        User.findOne({'email': new RegExp(email, "i")}, function (err, user) {
                return next(err,user);
        });
};

// finds a user by email (ignore case), and updates last login
exports.findAndUpdateLastLogin = function(email, next) {
    User.findOneAndUpdate({'email': new RegExp(email, "i")}, {lastLogin: new Date()}, function (err, user) {
        if (err) {
            return next(err);
        } else {
            return next(null, user);
        }
    });

};

// updates a user, given the user id, and user modification. Returns the modified user in callback
exports.updateUser = function(userIdParam, userModification ,next){

    User.findAndUpdate({_id :userIdParam},userModification , function(err,savedUser){
        if(err){
            return next(err,null);
        }else{
            return next(null,savedUser);
        }
    })

};

// IF YOU DELETE A USER, YOU MUST ALSO DELETE ALL HIS TASKS AND PROJECTS..
// thefore call the methods deleteAllUsersTask in TaskController and ...(more to be added) after this call.

// deletes a user
exports.deleteUser = function(userID, next){

    User.remove({ _id: userID}, function(err) {
        if (err) {
            return next(err);
        }
        else {
            return next(null);
        }
    });
};