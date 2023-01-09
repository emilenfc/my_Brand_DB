const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

////here I'm going to create schema for admin
const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter the email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'This email invalid, please Enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Enter the password please'],
        minLength: [6, 'Password should be atleast 6 characters'],
        validate: [
            (password) => {
            const regx = /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
            if (regx.test(password)) {
                return true
            } else {
                return false
            }
        },
        "Please Enter strong password: (lower & upper case and atleast one number and special character)"
    ]
    }
})

// static method to login admin and I will check if password and email is correct
adminSchema.statics.login = async function (email, password) {
    console.log({ email })
    const admin = await AdminSchema.findOne({ email })

    if (admin) {

        console.log(admin)
        console.log(password)

        const auth = await bcrypt.compare(password, admin.password)
        console.log('the value of auth is: ', auth)
        
        if (auth) {
            return admin
        }
        throw Error('incorrect password, try again')
    }
    throw Error('incorrect email, verrify your email and try again')
}
                   //fire a function before admin doc saved in my Data base

adminSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        console.log(error)
        next()
    }
})

const AdminSchema = mongoose.model('admin', adminSchema)
module.exports = AdminSchema

