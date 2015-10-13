/**
 * Created by arun on 10/10/15.
 */
var mongoose = require('mongoose');


// user scheme, validating unique email and length of paaword
var taskScheme = mongoose.Schema({

    name: {
        type: String,
        required: 'Task name is required'
    },
    text: {
        type: String
    },
    startDate:{
        type: Date
    },
    hours:{
        type: Number
    }

});

module.exports = mongoose.model('Task',taskScheme);
