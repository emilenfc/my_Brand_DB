const { urlencoded } = require("express")
const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
Names:{
        type:String,
        required: [true, 'Please enter your name'],
    },
Comment:{
    type:String,
    required: [true, 'Please enter your comments'],
},
blog_Id:{
    type: mongoose.Schema.Types.ObjectId, ref:'Blog'},

// user_Id:{
//     type: mongoose.Schema.Types.ObjectId, ref:'user'},
}
,
{  
timestamps: true,
    
});

const BlogComment = mongoose.model('BlogComment', commentSchema)
module.exports =  BlogComment;