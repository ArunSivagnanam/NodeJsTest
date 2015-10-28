
var mongoose = require('mongoose');

var taskScheme = mongoose.Schema({

    userID: {
        type:String,
        required: "no user specified"
    },
    projectId: {
        type: String,
        default: "no project defined"
    },
    taskName: {
        type: String,
        required: 'Please enter task name'
    },
    ttc: {
        type:Number,
        default: null
    },
    starTtime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date,
        default : null
    },
    note: String

});

module.exports = mongoose.model('Task',taskScheme);
