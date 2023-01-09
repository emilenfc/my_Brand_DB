const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const { app } = require('../app');

chai.use(chaiHttp);

describe("TESTING USER MESSAGE", () => {
  let token;
  before((done) => {
    chai.request(app)
      .post('/adminLogin')
      .send({
        "email": "iyaemile4@gmail.com",
        "password": "Emile@12"
      })
      .end((err, res)=>{
        res.should.have.status(200);
        token = res.headers['set-cookie'][0];  // get the jwt cookie from the response
        done();
      })
  })
  // Test GET all messages route
  describe('/userMessage', () => {
    it('should GET all messages', (done) => {
      chai.request(app)
        .get('/userMessage')
        .set('Cookie', token)  // set the jwt cookie in the request
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });





  // Test POST new message route
  describe('/sendMessage', () => {
    it('should POST a new message', (done) => {
      chai.request(app)
        .post('/sendMessage')
        .send({
          "name": "Kamana Eric",
          "email": "kamana@example.com",
          "message": "Hello, this is a message from kamana"
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          // res.body.should.have.property('name').eql('Kamana Eric');
          // res.body.should.have.property('email').eql('kamana@example.com');
          res.body.should.have.property('message').eql('your message send succesfull');
          done();
        });
    });
  });
});

