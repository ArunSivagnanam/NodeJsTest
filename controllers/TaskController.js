/**
 * Created by arun on 10/27/15.
 */
var Task = require('../models/Task');

// adds a task and returns it with a uniqe id added in the callback
exports.addTask = function(task,next){

    var taskModel = new Task(task);

    taskModel.save(function(err,savedTask){
        if(err) {
            return next(err,null);
        }else{
            return next(null,savedTask);
        }
    });

};

// deletes a task, given an taskID
exports.deleteTask = function(taskID, next){

  Task.remove({ _id: taskID}, function(err) {
      if (err) {
         return next(err);
      }
      else {
          return next(null);
      }
  });
};

// deletes all tasks a user have, given a userID
exports.deleteAllUsersTask = function(userIdParam, next){

    Task.remove({ userID: userIdParam}, function(err) {
        if (err) {
            return next(err);
        }
        else {
            return next(null);
        }
    });
};

// updates a task, given the user id, and task modification. Returns mongo update
exports.updateTask = function(taskIdParam, taskModification ,next){

    Task.update({_id:taskIdParam},taskModification , function(err,update){
        if(err){
            return next(err,null);
        }else{
            return next(null,update);
        }
    })

};

// returns all tasks in the callback for a user given a userID
exports.getTaskList = function(userIdparam ,next){

    Task.find({userID: userIdparam}, function(err,taskList){

        if(err){
            return next(err,null);
        }else{
            return next(null, taskList);
        }
    });
};

// returns a single task (firstFound) in the callback, given a userID and a TaskID,
exports.getTask = function(userIdparam, taskIdparam ,next){

    Task.findOne({_id: taskIdparam, userID: userIdparam}, function(err,task){

        if(err){
            return next(err,null);
        }else{
            return next(null, task);
        }
    });
};
