const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

//user schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter the email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter the password'],
        minLength: [6, 'Minimum password length is 6 characters'],
        validate: [
            (password) => {
                const reg = /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
                if (reg.test(password)) {
                    return true
                } else {
                    return false
                }
            },
            "Please Enter strong password:(lower & upper case and atleast one number and special character)"]
    }
})

//fire a function before user doc saved to db
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        console.log(error)
        next()
    }
})

// static method to login user and I will check if password and email is correct

userSchema.statics.login = async function (email, password) {
    //console.log({ email })
    const user = await UserSchema.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('incorrect password, check again')
    }
    throw Error('incorrect email, try again')
}

const UserSchema = mongoose.model('user', userSchema)
module.exports = UserSchema