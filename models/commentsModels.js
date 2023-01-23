const { urlencoded } = require("express")
const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    blogName:{
        type:String
    },
    date:{
        type:String,
        required: [true, 'Please enter date'],
    },
    Time:{
        type:String,
        required: [true, 'Please enter Time'],
    },
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