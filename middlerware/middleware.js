const jwt = require('jsonwebtoken')
const UserSchema = require('../models/userRegister')

const requireAuth = (req, res, next) => {
    //console.log(req)
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ "statusCode": 401, "message": "Please Login" })
    }
  const token = authorization.split(" ")[1];
    console.log("My admin tokeen is" + token)
    // this will check json web token exists & verified
    if (token) {
        jwt.verify(token, 'thisismysecreteonlytoadmin', (err, decodedToken) => {
            if (err) {
                // console.log(err.message)
                return res.status(401).json("Please This is for admin only").redirect('/')
                

                //{ "statusCode": 401, "message": "This is for admin only!!!!" }
            } else {
                //res.redirect('/adminDashboard')
                req.user = decodedToken;
                // console.log(decodedToken)
                next()
            }
        })
    }
    else {
        res.status(406).json("login first to do anything")
        //{ "statusCode": 406, "message": "login first", "data": ["Login Page"] }
        //res.redirect('/login')
    }
}

// here is to check for the current user 

const checkUser = (req, res, next) => {

    // console.log("my tokeen is " +req.cookies.jwt)

    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ "statusCode": 401, "message": "Please Login" })
    }

  const token = authorization.split(" ")[1];

    if (token) {
        jwt.verify(token, 'thisismysecreteonlytousers', async (err, decodedToken) => {
           
            if (err) {
                // console.log(err.message)
                res.locals.user = null;
                res.send({message:"login first"})
                //next()
            } else {
                // console.log(decodedToken)

                let user = await UserSchema.findById(decodedToken.id)
                // res.locals.user = user;
                req.user = user
                next()
            }
        })
    } else {
        //res.locals.user = null;
        req.user = null;
        //res.redirect('Login Page')//render login page to the user
        res.status(406).json("login first to procceed")
        //{ "statusCode": 406, "message": "login first", "data": ["Login Page"] }
    }
}

module.exports = { requireAuth, checkUser }