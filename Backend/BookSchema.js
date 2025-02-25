const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    publishedYear:{
        type:Number
    },
    availableCopies:{
        type:Number,
        required:true
    },
    borrowedBy:{
        type:String,
        required:true
    },
})

const Books = mongoose.model('Books',BookSchema)
module.exports = Books