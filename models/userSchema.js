const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required:[true, 'Please provide your name'],
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        required:[true,'Please provide your email address'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         'Please provide a valid email address'
        ],
    },
    password:{
        type: String,
        trim: true,
        required:[true, 'Please provide your password'],
        minlength: 6,
       
    },
    image:{
        type:String,
    },
    cloudinary_id:{
        type: String,
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
});

module.exports =mongoose.model('User',UserSchema)