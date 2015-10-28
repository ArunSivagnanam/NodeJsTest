/**
 * Created by arun on 10/10/15.
 */
var express = require('express');
var passport = require('passport');
var userController = require('../controllers/UserController');
var bcrypt = require('bcrypt');
var router = express.Router();


router.post('/register', function(req, res, next){

    bcrypt.hash(req.body.password, 10 , function(err,hash){

        if(err){
            return next(err);
        }
        var user = {
            name:{
                first: req.body.firstname,
                last: req.body.lastname
            },
            email: req.body.email,
            password: hash
        };
        userController.addUser(user, function(err,savedUser){
            if(err) { // validation err is 500 from mongo
                next(err); // buble up to error handler
            }else{
                console.log("the user got id: "+savedUser.id);
                req.login(user,function(err){
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

router.post('/login',passport.authenticate('local',{
    failureRedirect: '/login',
    successRedirect: '/home',
    failureFlash: 'invalid credentials'
}));


module.exports = router;

