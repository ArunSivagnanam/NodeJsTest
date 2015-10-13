/**
 * Created by arun on 10/10/15.
 */
var express = require('express');
var User = require('../models/User.js');
var passport = require('passport');
var bcrypt = require('bcrypt');
var router = express.Router();


router.post('/register', function(req, res, next){

    bcrypt.hash(req.body.password, 10 , function(err,hash){

        if(err){
            return next(err);
        }
        var user = new User({
            name:{
                first: req.body.firstname,
                last: req.body.lastname
            },
            email: req.body.email,
            password: hash
        });

        user.save(function(err){
            if(err) { // validation err is 500 from mongo
                next(err); // buble up to error handler
            }else{
                req.login(req.body,function(err){

                    if(err){
                        res.status(200).send('try manual login');
                    }else{
                        res.redirect('/home');
                    }
                });
            }
        });

    });

});

router.post('/login',passport.authenticate('local'), function(req, res, next){

    res.redirect('/home');

});




module.exports = router;

