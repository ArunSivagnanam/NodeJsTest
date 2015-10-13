/**
 * Created by arun on 10/10/15.
 */
var express = require('express');
var Task = require('../models/Task.js');
var router = express.Router();

router.get('/tasks/:userID', function(req, res, next){

    User.find(function(err, users) {
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });


});