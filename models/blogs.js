const { urlencoded } = require("express")
const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

//here I'm going to create schemafor blogs
const blogsSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a blog title'],
        unique: true,
    },
    author: {
        type: String,
        required: [true, 'Please enter Author'],
    },
    text: {
        type: String,
        required: [true, 'Please enter a blog text'],
        unique: true,
    },
    image: {
        type: [String, 'Pleade enter background image url'],
        required: [true, 'Please enter a blog image'],
    },
    Time :{
        type: [String, 'Pleade enter background image url'],
    },
    blog_comments: [{ 
        Time: String,
        date: String,
        Names: String,
        Comment: String
    }],

    likes:[{
        type: mongoose.Schema.Types.ObjectId,
         ref:'BlogLike'
        
    }]
})


const BlogsSchema = mongoose.model('Blog', blogsSchema)


module.exports = BlogsSchema
