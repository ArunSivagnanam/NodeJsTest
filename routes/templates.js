/**
 * Created by arun on 10/31/15.
 */
var express = require('express');
var router = express.Router();


router.get('/timeline', function(req, res, next){
    res.render('timeline', { title: 'PlanPenny' , error: req.flash('error')});
});

router.get('/tasks', function(req, res, next){
    res.render('tasks', { title: 'PlanPenny' , error: req.flash('error')});
});

module.exports = router;