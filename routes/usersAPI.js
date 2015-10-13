var express = require('express');
var User = require('../models/User.js');
var router = express.Router();

router.get('/init', function(req, res, next){

  var user1 = new User({
    name:{
      first:"arun",
      last: "Sivagnanam"
    },
    email: "arun.s@live.dk",
    password: "123456"
  });

  var user2 = new User({
    name:{
      first:"bob",
      last: "bobbobbob bboo"
    },
    email: "bob.b@live.dk",
    password: "123456"
  });

  var users = [user1,user2];

  users.forEach(function(element, index, array){
    element.save(function(err){

      if(err) return next(err);
    });
  });

  res.send("list is initiated");

});

router.get('/users', function(req, res, next){

  User.find(function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });


});

router.get('/user/:id', function(req, res, next){

  var quary = User.findById(req.params.id);

  quary.exec(function(err,result){

    if(!err){
      res.json(result);
    }else{
      next(err);
    }

  });


});

module.exports = router;

