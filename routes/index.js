var express = require('express');
var restrict = require('../authentication/restrict.js');
var router = express.Router();


var index = function(req, res, next){
  res.render('index', { title: 'PlanPenny'});
};

router.get('/register', function(req, res, next){
  res.render('register', { title: 'PlanPenny' });
});

router.get('/login', function(req, res, next){
  res.render('login', { title: 'PlanPenny' , error: req.flash('error')});
});

router.get('/home',restrict, function(req, res, next){
  res.render('home', { title: 'PlanPenny', user: req.user  });
});

router.get('/bob',restrict, function(req, res, next){
  res.send("bobob");
});

router.get('/logout', function(req, res, next){
  req.logOut();
  res.redirect('/index');
});

/* GET home page. */
router.get('/', index);
router.get('/index', index);


module.exports = router;
