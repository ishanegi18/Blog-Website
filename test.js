const express = require('express')
const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb+srv://isha:Isha%40123@cluster0.q8cds.mongodb.net', {useNewUrlParser: true})

BlogPost.create({
    title: 'This is my third Blog Post',
    body: 'This is the body of my third Blog Post.'
}, (error, blogpost) => {
    console.log(error, blogpost)
})

// BlogPost.find({}, (error, blogpost) => {
//     console.log(error, blogpost)
// })

BlogPost.find({title: /This/}, (error, blogpost) => {
    console.log(error, blogpost)
})

var id = "61f97a145419f7e2ebe349e7"

// BlogPost.findById(id, (error, blogpost) => {
//     console.log(error, blogpost)
// })

BlogPost.findByIdAndUpdate(id, {
    title: 'New Title'    
}, (error, blogpost) => {
    console.log(error, blogpost)
})

BlogPost.findOneAndDelete(id, (error, blogpost) => {
    console.log(error, blogpost)
})