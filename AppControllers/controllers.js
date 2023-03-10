const AdminSchema = require('../models/adminRegister')
const UserSchema = require('../models/userRegister')
const BlogsSchema = require('../models/blogs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const BlogComment = require('../models/commentsModels')
const BlogLike = require('../models/blogLikeModel')

const { checkUser } = require('../middlerware/middleware')

//Error handler function here
const handleErrors = (err) => {
    //console.log(err.message, err.code)

    let flag = false
    const errors = { email: '', password: '' }

    // duplicate error code when email allread exis
    if (err.code === 11000) {
        flag = true
        errors.email = 'That email is already exist, check your email and try again'
        return [errors.email, flag]
    }
    //incorrect Email
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered'
    }

    //incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'incorrect password'
    }

    //validation errors for admin
    if (err.message.includes('admin validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            //console.log(properties)
            errors[properties.path] = properties.message
        })
    }

    //validation errors for user
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            //console.log(properties)

            errors[properties.path] = properties.message
        })
    }

    return [errors, flag]
}

// Admin registering DB

module.exports.adminRegister = async (req, res) => {
    const { email, password } = req.body

    try {
        const admin = await AdminSchema.create({ email, password })
        //console.log(admin)

        res.status(200).json({ "statusCode": 200, "message": 'Admin is now registred successfully' })
    } catch (error) {
        const errors = handleErrors(error)
        if (errors[1]) {
            return res.status(400).json({ "statusCode": 400, "message": errors[0] })
        }
        else {
            res.status(400).json(errors)
        }

    }
}

//User registration
module.exports.userRegister = async (req, res) => {
    const { firstName, secondName, phone, email, password } = req.body

    try {
        const user = await UserSchema.create({ firstName, secondName, phone, email, password })

        //console.log(user)

        res.status(200).json({ "statusCode": 200, "message": 'Your registration is done successfully' })
    } catch (error) {
        const errors = handleErrors(error)
        if (errors[1]) {
            return res.status(400).json({ "statusCode": 400, "message": errors[0] })
        }
        else {
            res.status(400).json(errors)
        }

    }
}


// jwt expireation time
const maxAge = 2 * 24 * 60 * 60  //thi is 3 days in seconds unlike cookie use time in milliseconds

//JWT creation for admin only
const createAdminToken = (id) => {
    return jwt.sign({ id }, 'thisismysecreteonlytoadmin', {
        expiresIn: maxAge
    })
}

// JWT creation for logged in user

const createUserToken = (id) => {
    return jwt.sign({ id }, 'thisismysecreteonlytousers', {
        expiresIn: maxAge
    })
}

module.exports.home = async (req, res) => {
    res.status(200).send({ message: 'welcome to Home Page!!!!!' })
}

//login a user 
module.exports.Userlogin_post = async (req, res) => {
    const { email, password } = req.body
    //console.log(email, password )
    try {
        const user = await UserSchema.login(email, password)

        const token = createUserToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        return res.status(200).json({ "statusCode": 200, "message": 'user succesful login', "Id_user": user._id, user: email, userToken: token })
    }
    catch (err) {
        const errors = handleErrors(err)
        return res.status(400).json({ "statusCode": 400, "message": errors })
    }
}

//login  as an admin
module.exports.Adminlogin_post = async (req, res) => {
    const { email, password } = req.body

    // console.log(email, password)

    

    try {
        const admin = await AdminSchema.login(email, password)

        const token = createAdminToken(admin._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        return res.status(200).json({ "statusCode": 200, "message": 'Admin is succesful login', adminToken: token })
    }

    catch (err) {
        const errors = handleErrors(err)
        return res.status(400).json({ errors })
    }
}

//user logout
module.exports.Userlogout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 2000 })
    res.status(200).json({ "statusCode": 200, "message": "logOut done well and Success", "data": ["Home page"] })
    //res.redirect('/')
}

// Get all user 
module.exports.allUsers = async (req, res) => {//creation of new 'GET' route with "router.get"
    try {
        const admin = await AdminSchema.find()
        const users = await UserSchema.find()
        res.status(200).json({ "statusCode": 200, "message": "Successfully", "data": { admin, users } })
    } catch (err) {
        const errors = handleErrors(err)
        if (errors[1]) {
            return res.status(404).send(errors[0])
        }
        else {
            res.status(404).send(errors)
        }
    }
}

// here is to Delete one user
module.exports.deleteOneUser = async (req, res) => {
    try {
        await UserSchema.deleteOne({
            _id: req.params.id
        })
        res.status(200).json({ "statusCode": 200, "message": "Deleted Successful" })
    } catch (error) {
        res.status(404)
        res.send(
            { error: error.message }
        )
    }
}

//Delete all user
module.exports.deleteAllUser = async (req, res) => {
    try {
        await UserSchema.deleteMany()
        res.status(200).json({ "statusCode": 200, "message": "Deleted Successful" })
    } catch (error) {
        res.status(404)
        res.send(
            { error: error.message }
        )
    }
}

/************* CRUD op on blogs ***************/

//Get all blogs

module.exports.allBlogs = async (req, res) => {//creation of new 'GET' route with "router.get"
    try {
        const blogs = await BlogsSchema.find()
        res.json({ "statusCode": 200, "message": "Successfully", "data": blogs });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.getOneBlog = async (req, res) => {
    try {
        const blog = await BlogsSchema.findOne({
            _id: req.params.id
        })
        res.json({ "statusCode": 200, "message": "Successful", "data": blog })
    } catch (error) {
        res.status(404)
        res.json({
            error: error.message
        })
    }
}

module.exports.createBlog = async (req, res) => {
    try {
        const blog = new BlogsSchema({
            title: req.body.title,
            author: req.body.author,
            text: req.body.text,
            image: req.body.image,
            Time: req.body.Time
        })
        await blog.save()
        res.status(201).json({ "statusCode": 201, "message": "Blog Created successfully" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.updateBlog = async (req, res) => {
    try {
        const blog = await BlogsSchema.findOne({
            _id: req.params.id
        });

        if (req.body.title) {
            blog.title = req.body.title;
        }
        if (req.body.author) {
            blog.author = req.body.author
        }
        if (req.body.text) {
            blog.text = req.body.text
        }

        await blog.save()
        res.status(200).json({ "statusCode": 200, "message": "Updated Successfully", "Blog": blog });

    } catch (error) {
        res.status(400)
        res.json({
            error: error.message
        })
    }
}


module.exports.deleteOneBlog = async (req, res) => {
    try {
        await BlogsSchema.deleteOne({
            _id: req.params.id
        })
        res.status(200).json({ "statusCode": 200, "message": "Deleted Successfully" })
    } catch (error) {
        res.status(400)
        res.json({
            error: error.message
        })
    }
}

module.exports.deleteAllBlogs = async (req, res) => {
    try {
        await BlogsSchema.deleteMany()
        res.status(200).json({ "statusCode": 200, "message": "All deleted Successfully" })
    } catch (error) {
        res.status(400)
        res.json({
            error: error.message
        })
    }
}


//comment on blog
//BlogComment


module.exports.createComment = async (req, res) => {
    let blog_id = req.params[0];

    if (!mongoose.Types.ObjectId.isValid(req.params.blog_id)) {
        return res.status(400).send({
            message: "Invalid blog id",
            data: {}
        });
    }
    await BlogsSchema.findById(req.params.blog_id)
        .then(async (blog) => {
            console.log(req.params)
            console.log(req.body)
            if (!blog) {
                return res.status(400).send({
                    message: "No Blog found",
                    data: {}
                });

            } else {
                let blogName;
                if (blog) {
                    blogName = blog.title
                    console.log(blogName)
                }
                try {
                    console.log(blogName)

                    // Code to create a new comment and save it to the database here
                    let comment = new BlogComment({
                        blogName: blogName,
                        date: req.body.date,
                        Time: req.body.Time,
                        Names: req.body.Names,
                        Comment: req.body.Comment,
                        blog_id: blog_id
                        // Set properties for the new comment here
                    });
                    console.log(comment)
                    let commentData = await comment.save();

                    let newOne = await BlogsSchema.findById(
                        req.params.blog_id,
                    )

                    newOne.blog_comments.push(commentData)
                    await newOne.save();

                    return res.status(200).send({
                        message: "Comment successfully added",
                        data: commentData
                    });
                } catch (error) {
                    return res.status(400).send({
                        message: error.message,
                        data: error
                    });
                }

            }

        }).catch((err) => {
            return res.status(400).send({
                message: err.message,
                data: err
            });
        });
};
/// to get all comments
module.exports.getAllCommetsofAllBlogs = (req, res) => {
    BlogComment.find({}, (err, message) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(message);
        }
    })
}

module.exports.getBlogComments = async (req, res) => {
    let blog_id = req.params[0];

    if (!mongoose.Types.ObjectId.isValid(req.params.blog_id)) {
        return res.status(400).send({
            message: "Invalid blog id",
            data: {}
        });
    }
    try {
        const blog = await BlogsSchema.findOne({
            _id: req.params.blog_id
        })
        res.json({ "statusCode": 200, "message": "Successful", "comments": blog.blog_comments })
    } catch (error) {
        res.status(404)
        res.json({
            error: error.message
        })
    }
}

/////// like and Unlike a blog

/////// LIKE a blog
module.exports.like = async (req, res) => {
    let blog_id = req.params.blog_id;

    // Validate the blog id
    if (!mongoose.Types.ObjectId.isValid(blog_id)) {
        return res.status(400).send({
            message: "Invailable blog id",
            data: {}
        });
    }

    try {
        // Find the blog using the id
        const blog = await BlogsSchema.findOne({ _id: blog_id });
        if (!blog) {
            return res.status(400).send({
                message: "No Blog found",
                data: {}
            });
        }

        // Get the current user from the request
        const current_user = req.user;
        console.log(current_user)
        // Find the like for the current user and blog
        const blog_like = await BlogLike.findOne({
            blog_Id: blog_id,
            user_Id: current_user._id // to get current user id

        });
        console.log(blog_like)

        if (!blog_like) {
            // If there is no like, create a new one
            const blogLikeDoc = new BlogLike({
                blog_Id: blog_id,
                user_Id: current_user._id
            });
            const likeData = await blogLikeDoc.save();

            // Add the like to the blog's list of likes
            await BlogsSchema.updateOne(
                { _id: blog_id },
                { $push: { likes: likeData._id } }
            );

            // Return a success message and the like data
            return res.status(200).send({
                message: "Like successfully added",
                data: likeData
            });
        } else {
            // If there is already a like, delete it
            await BlogLike.deleteOne({ _id: blog_like._id });
            // Remove the like from the blog's list of likes
            await BlogsSchema.updateOne(
                { _id: blog_id },
                { $pull: { likes: blog_like._id } }
            );

            // Return a success message and the like data
            return res.status(200).send({
                message: "Like successfully removed",
                data: blog_like
            });
        }
    } catch (err) {
        console.log(err);
        // If there is an error, return it with a status of 400
        return res.status(400).send({
            message: err.message,
            data: err
        });
    }
};
module.exports.getBloglikes = async (req, res) => {
    let blog_id = req.params;
    console.log(req.params)
    if (!mongoose.Types.ObjectId.isValid(req.params.blog_id)) {
        return res.status(400).send({
            message: "Invalid blog id",
            data: {}
        });
    }
    try {
        const blog = await BlogsSchema.findOne({
            _id: req.params.blog_id
        })
        mem = blog.likes
        res.json({ "statusCode": 200, "message": "Successful this is likes", "People_likes": mem, "number": mem.length })
    } catch (error) {
        res.status(404)

        res.json({
            error: error.message
        })
    }
}












/////// user messages
const Message = mongoose.model('Message', {
    date: {
        type: String,

    },

    Time: {
        type: String,
    },
    name: {
        type: String,
        required: [true, 'Please enter your names'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your emaail'],
    },
    message: {
        type: String,
        required: [true, 'Please enter your message'],
    }
});
/// admin can get all messages
module.exports.getMessage = (req, res) => {
    Message.find({}, (err, message) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(message);
        }
    })
}
//post a message (user)
module.exports.postMessage = (req, res) => {
    const newMessage = new Message({
        date: req.body.date,
        Time: req.body.Time,
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    })
    newMessage.save((err, message) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(201).send({ message: "message send" })
        }
    })
}
module.exports.deleteMessage = async (req, res) => {
    try {
        await Message.deleteOne({
            _id: req.params.id
        })
        res.status(200).json({ "statusCode": 200, "message": "message Deleted Successfully" })
    } catch (error) {
        res.status(400)
        res.json({
            error: error.message
        })
    }
}



/// for user subscribing
const Subscribe = mongoose.model('Subscribe', {
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    Time: {
        type: String
    },
    date: {
        type: String
    }
});

module.exports.postSubscribe = async (req, res) => {
    // Get the current user from the request

    try {
        const newSubscribe = new Subscribe({
            email: req.body.email,
            Time: req.body.Time,
            date: req.body.date
        })

        let subscribed = await Subscribe.findOne({ email: newSubscribe.email });
        if (subscribed) {
            let email = newSubscribe.email
            res.send({ message: `${email} already subscribed` });
        } else {
            newSubscribe.save((err, message) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(201).send({ message: "Subscribed Succesfull" })
                }
            });
        }
    } catch (err) {
        res.status(500).send(err)
    }
}



/// admin can get all messages
module.exports.getSubscribe = (req, res) => {
    Subscribe.find({}, (err, message) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(message);
        }
    })
}
module.exports.deleteOneSubscribers = async (req, res) => {
    console.log("hellooolol")
    try {
        await Subscribe.deleteOne({
            _id: req.params.id,

        })
        res.status(200).json({ "statusCode": 200, "message": "Deleted" })
    } catch (error) {
        res.status(400)
        res.json({
            error: error.message
        })
    }
}
module.exports.deleteAllSubscribers = (req, res) => {
    Subscribe.deleteMany({}, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({ message: "All subscribers have been successfully deleted" });
        }
    });
}
