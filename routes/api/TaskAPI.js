/**
 * Created by arun on 10/10/15.
 */
var express = require('express');
var taskController = require('../../controllers/TaskController.js');
var restrict = require('../../authentication/restrict.js');
var router = express.Router();


// returns all tasks for a user as json list
router.get('/tasks/:userID', restrict, function(req, res, next){

    taskController.getTaskList(req.params.userID, function(err,taskList){

        if(err){
            return next(err); // call error handler
        }else{
            res.send(taskList);
        }
    });
});

// returns a single task json obj
router.get('/task/:userID/:taskID',restrict, function(req, res, next){

    taskController.getTask(req.params.userID, req.params.taskID, function(err,task){

        if(err){
            return next(err); // call error handler
        }else{
            res.send(task);
        }

    });
});

// adds a task (task details in body)
router.post('/task/',restrict, function(req, res, next){

    taskController.addTask(req.body, function(err,savedTask){

        if(err){
            return next(err);
        }else{
            res.send(savedTask);
        }
    });
});

// updates a task
router.put('/task/:taskID',restrict, function(req, res, next){

    taskController.updateTask(req.params.taskID, req.body, function(err,update){

        if(err) {
            return next(err);
        }else{
            res.send(update);
        }
    });

});

// deletes a task
router.delete('/task/:taskID',restrict, function(req, res, next){

    taskController.deleteTask(req.params.taskID, function(err){

        if(err){
            return next(err);
        }else{
            res.status(200).send("Task deleted");
        }
    });

});

module.exports = router;