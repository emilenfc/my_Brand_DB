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
    content: {
        type: String,
        required: [true, 'Please enter a blog content'],
        unique: true,
    },
    imageUlr: {
        type: [String, 'Pleade enter background image url'],
        required: [true, 'Please enter a blog content'],
        unique: true,
    },
    blog_comments: [{ 
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
