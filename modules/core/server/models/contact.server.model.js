'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');

var validateFieldStrategy = function(property){
    return property.length;
}

var validateEmailStrategy = function(property){
    return validator.isEmail(property);
};

var ContactSchema = new Schema({

    firstName: {
        type: String,
        default: '',
        trim: true,
        validate: [validateFieldStrategy, 'Firstname cannot be empty']
    },
    lastName: {
        type: String,
        default: '',
        trim: true,
        validate: [validateFieldStrategy, 'Lastname cannot be empty']
    },
    email:{
        type: String,
        default:'',
        trim:true,
        unique:true,
        lowercase:true,
        validate:[validateEmailStrategy, 'Please enter valid email id']
    }

});

mongoose.model('manisha', ContactSchema);
