const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const { app } = require('../app')
chai.use(chaiHttp)

//Login test
describe('Log In test', function () {

    it('should logs in a user', (done) => {
        chai
            .request(app)
            .post('/login')
            .send({
                "email": "emile@gmail.com",
                "password": "Emile@12"
            })
            .end((err, res) => {
                if (err) {
                    console.log("The err is :", err)
                    return done(err)
                }

                //error message testing
                describe("Login error message testing", function () {
                    if (res.body.statusCode === 400) {
                        it("user login error messages", (done) => {

                            assert.equal(res.statusCode, 400)
                            if (res.body.message[0].email !== "") {
                                assert.equal(res.body.message[0].email, "that email is not registered")
                            } else {
                                assert.equal(res.body.message[0].email, "")
                            }
                            if (res.body.message[0].password !== "") {
                                assert.equal(res.body.message[0].password, "incorrect password")
                            } else {
                                assert.equal(res.body.message[0].password, "")
                            }
                            done()
                        })
                    }
                    done()
                })

                if (res.body.statusCode === 200) {
                    it('should test user login successfulness', (done) => {
                        //testing for success
                        assert.equal(res.statusCode, 200)
                        assert.equal(res.body.message, "user log in succesful")
                        done()
                    })
                }

            })
    })
})

//SignUp testing
describe('Sign up Test', () => {
    it('this should Register new User', (done) => {
        chai
            .request(app)
            .post('/userRegister')
            .send({
                "email": "Test1@gmail.com.com",
                "password": "Test@123"
            })
            .end((err, res) => {
                if (err) {
                    console.log("The err is :", err)
                    return done(err)
                }
                //error message testing
                describe("Registration error message testing", function () {
                    if (res.body.statusCode === 400) {
                        it("should check user registration error messages", (done) => {
                            assert.equal(res.statusCode, 400)
                            assert.equal(res.body.message, "That email is already registered")
                            done()
                        })
                    }
                    if (res.body.statusCode === 200) {
                        it('should check the registration successfulness', (done) => {
                            //testing for success
                            assert.equal(res.statusCode, 200)
                            assert.equal(res.body.message, 'Your registration done successfully')
                            done()
                        })
                    }
                    done()

                })
            })
    })
})

