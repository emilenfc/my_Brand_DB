const { urlencoded } = require("express")
const mongoose = require("mongoose")

const likeSchema = mongoose.Schema({
blog_Id:{
    type: mongoose.Schema.Types.ObjectId, ref:'Blog'},

user_Id:{
    type: mongoose.Schema.Types.ObjectId, ref:'User'},
}
,
{  
timestamps: true,
    
});

const BlogLike = mongoose.model('BlogLike', likeSchema)
module.exports =  BlogLike;