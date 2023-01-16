
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
//assertion style
const expect = chai.expect;
const should = chai.should()
const { app } = require('../app');
//Blog test

let token;

before((done) => {
  chai.request(app)
    .post('/adminLogin')
    .send({
      "email": "iyaemile4@gmail.com",
      "password": "Emile@12"
    })
    .end((err, res) => {
      res.should.have.status(200);
      token = res.headers['set-cookie'][0]; // get the jwt cookie from the response
      done()
    })
})
describe("ADMIN bLOG CRUD TESTS", () => {
  it("ADMIN CAN Get all users",(done)=>{
    chai
    .request(app)
    .get('/getAllUsers')
    .set('Cookie', token)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("data")
      done()
    })
  })
})
describe("ADMIN bLOG CRUD TESTS", () => {
  /**
  
  Test Get /allBlogs
  */
  describe("GET/allBlogs", () => {
    it("Should Get allBlogs", (done) => {
      chai
        .request(app)
        .get('/allBlogs')
        .set('Cookie', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data")
          done()
        })
    })
  })
 
   
    /**
      
      Test POST /createBlog
      */
    describe("POST /createBlog", () => {
      it("Should create a new blog", (done) => {
        chai
        .request(app)
        .post("/createBlog")
        .set('Cookie', token)
        .send({
          "title": "Test Blog Title",
          "content": "Test Blog Content",
          "imageUrl": "https:///testblog.com/test--image.jpg"
        })
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Blog Created successfully");
          id = res.body.message._id; // store the created blog's id for future test cases
          done();
        });
       
      });
    });
    describe("DELETE /deleteAllBlogs", () => {
      it("Should delete all blogs", (done) => {
        chai
          .request(app)
          .delete("/deleteAllBlogs")
          .set('Cookie', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("All deleted Successfully");
            done();
          });
      });
      it('Testing DELETE ONE "/deleteOneBlog/:id"', (done) => {
        chai
          .request(app)
          .delete('/deleteOneBlog/63a154066e166cf15da44031')
          .set('Cookie', token)
          .end((err, res) => {
            if (err) console.err(err)
                  res.body.should.be.a('object')
            res.body.should.have
              .property('message')
              .eql('Deleted Successfully')
        res.body.should.have.property('message')
            done()
   })
      })
    })
    });
 // let id;
    // beforeEach((done) => {
    //   chai
    //     .request(app)
    //     .post("/createBlog")
    //     .set('Cookie', token)
    //     .send({
    //       "title": "Testing Blog Title",
    //       "content": "Testing Blog Content",
    //       "imageUrl": "https:///testblog.com/test-image.jpg"
    //     })
    //     .end((err, res) => {
    //       should.not.exist(err);
    //       res.should.have.status(201);
    //       res.body.should.be.a("object");
    //       res.body.should.have.property("message").eql("Blog Created successfully");
    //       id = res.body.message._id; // store the created blog's id for future test cases
    //       done();
    //     });
    // })


    /*
    Test Get by (/blog/:id)
    */
    // describe("GET /blog/:id", () => {
    //   it("Should Get a specific blog", (done) => {
    //     chai
    //       .request(app)
    //       .get(`/blog/${id}`)
    //       .set('Cookie', token)
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a("object");
    //         res.body.should.have.property("data");
    //         done();
    //       });
    //   });
    // });
    /**
     * Test PATCH /updateBlog/:id
     */
    // describe("PATCH /updateBlog/:id", () => {
    //   it("Should update an existing blog", (done) => {
    //     chai
    //       .request(app)
    //       .patch(`/updateBlog/${id}`) // use the stored blog id
    //       .set('Cookie', token)
    //       .send({
    //         "title": "Updated Test Blog Title",
    //         "content": "Updated Test Blog Content",
    //         "imageUrl": "https://testblog.com/updated-test-image.jpg"
    //       })
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a("object");
    //         res.body.should.have.property("data");
    //         done();
    //       });
    //   });
    // });

    // /**
    //  * Test DELETE  /deleteOneBlog/:id
    //  */
    // describe("DELETE  /deleteOneBlog/:id", () => {
    //   it("Should delete a specific blog", (done) => {
    //     chai
    //       .request(app)
    //       .delete(`/deleteOneBlog/${id}`)
    //       .set('Cookie', token)
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a("object");
    //         res.body.should.have.property("message").eql("Blog successfully deleted");
    //         done();
    //       });
    //   });
    // });
    /**
     * Test DELETE /deleteAllBlogs
     */
    

  })

