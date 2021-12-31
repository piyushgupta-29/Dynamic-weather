const express = require('express');
const app = express();
const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://27017').then(()=>console.log('connection successful')).catch((e)=>console.log('connection unsuccessful'));

let schema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
});

let Friend=new mongoose.model('Friend',schema);

