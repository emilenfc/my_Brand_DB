const chai = require('chai')
const chaiHttp = require('chai-http')
//assertion style
const expect = chai.expect;
const should = chai.should()
const API  = 'http://localhost:4000';

chai.use(chaiHttp)
//welcome test
describe("welcome test", ()=>{
    it("should test default API welcome message", (done)=>{
        chai.request(API)
        .get('/')
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a("object");
            const actualmessageVal = res.body.message;
            console.log(res.body.message);
            expect(actualmessageVal).to.be.equal("welcome to Home Page!!!!!")

        done()
        })



    })
})