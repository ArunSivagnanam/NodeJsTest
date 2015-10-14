/**
 * Created by arun on 10/8/15.
 */

var mongoose = require('mongoose');


// user scheme, validating unique email, password is hashed
var userScheme = mongoose.Schema({

    name: {
        first: {type: String},
        last: {type: String}
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password:{
        type: String
    }

});

module.exports = mongoose.model('User',userScheme);
