const mongoose = require('mongoose');
const validate = require('express-validator');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        trim:true,

    },
    lastname:{
        type:String,
        required:true,
        min:4,
        trim:true
    },
    email:{
        type:String,
        required:true,
        min:3,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
});

const User = mongoose.model('userInfos',userSchema);
module.exports = User;
