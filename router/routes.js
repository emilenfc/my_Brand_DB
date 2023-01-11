const express = require('express')
const router = express.Router()
const controllers = require('../AppControllers/controllers')
const { requireAuth, checkUser } = require('../middlerware/middleware')

/////////////home page 
/**
 * @openapi
 * /:
 *  get:
 *     tags:
 *     - Home Page
 *     description: welcome To home message
 *     summary: welcome message
 *     responses:
 *       200:
 *         description: return a message
 */

router.get('/', controllers.home)

/////////////admin register
/**
 * @openapi
 * '/adminRegister':
 *  post:
 *     tags:
 *     - Admin Operation
 *     summary: admin signup
*     requestBody:
*       description: please fill all required fields
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/user'
*     responses:
*       '200':
*         description: successfully account created

*/
router.post('/adminRegister', controllers.adminRegister)

/////////////user register routes
/**
 * @openapi
* /signup:
*   post:
*     summary: create your account
*     tags: [User activities]
*     requestBody:
*       description: please fill all required fields
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/user'
*     responses:
*       '200':
*         description: successfully account created
*/
router.post('/signUp', controllers.userRegister)

/////////////user login
/**
 * @openapi
* '/login':
*   post:
*     summary: login to your account
*     tags: [User activities]
*     requestBody:
*       description: please fill all required fields
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/user'
*     responses:
*       '200':
*         description: logged in successfully
*/
router.post('/login', controllers.Userlogin_post)

/////////////admin login // Emile@12
/**
 * @openapi
* '/adminLogin':
*   post:
*     summary: login as Admin
*     tags: [Admin Operation]
*     requestBody:
*       description: please fill all required fields
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/user'
*     responses:
*       '200':
*         description: successfully login as admin!
*/
router.post('/adminLogin', controllers.Adminlogin_post)

/////////////user logout
/**
 * @openapi
* '/logout':
*   get:
*     summary: logout now
*     tags: [User activities]
 *     description: you will be directed back to home page
 *     responses:
 *       200:
 *         description: succesfull loggedOut
*/
router.get('/logout', controllers.Userlogout_get)

/////////////Get all users
/**
 * @openapi
* '/getAllUsers':
*   get:
*     summary: Getting all users
*     tags: [Admin Operation]
*     description: only admin can get all users
*     responses:
*       200:
*         description: succesfull
*/
router.get('/getAllUsers', requireAuth, controllers.allUsers)

/////////////Delete one user
/**
 * @openapi
* "/deleteOneUser/:id":
*   delete:
*      tags: [Admin Operation]
*      summary: delete one user
*      parameters:
*        - name: id
*          in: path
*          description: provide The unique id of the user
*          required: true
*      responses:
*        200:
*          description: successfull user deleted
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/user'
*        404:
*          description: user not found
*/
router.delete("/deleteOneUser/:id", requireAuth, controllers.deleteOneUser)

///////////Delete all user
/**
 * @openapi
 * '/deleteAllUser':
 *    delete:
 *      summary: delete all user
 *      tags: [Admin Operation]
 *      description: delete all users from database can be only done by admin
 *      responses:
 *        200:
 *          description: All blogs are deleted
 */
router.delete('/deleteAllUser', requireAuth, controllers.deleteAllUser)

/**************** CRUDs op routes*******************/
///////////// Get all blogs
/**
 * @openapi
 * '/allBlogs':
 *    get:
 *      summary: get all blogs
 *      description: returns all blogs from our database
 *      tags: [Admin Operation]

 *      responses:
 *        200:
 *          description: blogs get all blogs from our api
 */
router.get("/allBlogs", requireAuth, controllers.allBlogs)

/////////////Get individual blog TEST :
/**
 * @openapi
 * "/blog/{id}":
 *    get:
 *      tags: [Admin Operation]
 *      summary: Get one blog
 *      description: returns a one blog should provide blog id from our database
 *      parameters:
 *        - name: blog id
 *          in: path
 *          description: provide blogId
 *          required: true
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            type: object
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/blog'
 *        404:
 *          description: not found
 */


router.get("/blog/:id", requireAuth, controllers.getOneBlog)

/////////////Create a blog
/**
 * @openapi
 * '/createBlog':
 *   post:
 *     summary: create new blog
 *     tags: [Admin Operation]
 *     requestBody:
 *       description: please fill all required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBlogInput'
 *     responses:
 *       '201':
 *         description: Created
 */
router.post("/createBlog", requireAuth, controllers.createBlog)

/////////////Update a blog (patch or edit)
/**
 * @openapi
 * /updateBlog/:id:
 *   patch:
 *     summary: update a single blog
 *     description: only admin can update
 *     tags: [Admin Operation]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: provide blogId
 *        required: true
 *     requestBody:
 *       description: please fill all required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBlogInput'
 *     responses:
 *       '201':
 *         description: Created successfuly
 */
router.patch("/updateBlog/:id", requireAuth, controllers.updateBlog)

/////////////Delete a single blog 
/**
 * @swagger
 * /deleteOneBlog/:id:
 *    delete:
 *      summary: delete one blog.
 *      tags: [Admin Operation]
 *      description: deleting a one blog, should provide blog id from our database
 *      parameters:
 *        - name: id
 *          in: path
 *          description: provide blogId
 *          required: true
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/blog'
 *        404:
 *          description: not found
 */
router.delete("/deleteOneBlog/:id", requireAuth, controllers.deleteOneBlog)

/////////////Delete all blogs 
/**
 * @openapi
 * '/deleteAllBlogs':
 *    get:
 *      summary: delete all blog
 *      tags: [Admin Operation]
 *      description: delete all blogs from our database
 *      responses:
 *        200:
 *          description: All blogs are deleted
 */
router.delete("/deleteAllBlogs", requireAuth, controllers.deleteAllBlogs)


/************* USER Ops *****************/
///////////// Get all blogs
/**
 * @swagger
 * /Blogs:
 *    get:
 *      tags: [User activities]
 *      summary: Get all blogs as USER
 *      description: returns all blogs from our database
 *      responses:
 *        200:
 *          description: Get all blogs.
 *        406:
 *          description: login first to get blogs
 */
router.get("/Blogs", checkUser, controllers.allBlogs)

/////////////////////////comments
/**
 * @openapi
 * /comments/:blog_id:
 *     post:
 *       tags: [User activities]
 *       summary: create a new comment
 *       parameters:
 *         - name: blog_id
 *           in: path
 *           description: The unique id of the blog
 *           required: true      
 *       requestBody:
 *         description: please fill all required fields
 *         required: true
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/blogComment'
 *       responses:
 *         200:
 *           description: Successfully created new comment
 *
 *         400:
 *           description: Invalid blog ID or other error occurred
 *           content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *                data:
 *                  type: object
 *                  description: Error object
 *
 */

router.post("/comments/:blog_id", checkUser, controllers.createComment)
//////////////////////// like and unlike
/**
 * @openapi
 * "/:blog_id/like":
 *    post:
 *      summary: like a blog
 *      tags: [User activities]
 *      parameters:
 *        - name: blog_id
 *          in: path
 *          type: string
 *          description: provide The unique id of the blog
 *          required: true
 *      responses:
 *        200:
 *          description: successfull liked
 *        400:
 *         description: Invalid blog ID or other error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                 data:
 *                   type: object
 *                   description: Error object
 */

router.post("/:blog_id/like", checkUser, controllers.like)

/**
 * @openapi
 * '/userMessage':
 *   get:
 *     summary: Retrieve all messages
 *     operationId: getMessages
 *     tags:
 *       - USER Messages
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       '401':
 *         description: Unauthorized(this is Admin operation)
 */

router.get("/userMessage", requireAuth, controllers.getMessage)

/**
 * @openapi
 * /sendMessage:
 *   post:
 *     summary: Create a new message
 *     operationId: createMessage
 *     tags:
 *       - USER Messages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.post("/sendMessage", controllers.postMessage)


/**
 * @openapi
 * /subscribe:
 *   post:
 *     summary: get weekely update
 *     operationId: subscribe
 *     tags:
 *       - SUBSCRIBE
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscribe'
 *     responses:
 *       '201':
 *         description: Success subscribed
 */
router.post("/subscribe", checkUser, controllers.postSubscribe)
/**
 * @openapi
 * '/getSubscriber':
 *   get:
 *     summary: Get all subscribers
 *     operationId: getSubscribers
 *     tags:
 *       - SUBSCRIBE
 *     responses:
 *       '200':
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscribe'
 *       '401':
 *         description: Unauthorized(this is Admin operation)
 */
router.get("/getSubscriber", requireAuth, controllers.getSubscribe)
/**
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required:true
 *         password:
 *           type: string
 *           required: true
 *           
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    user:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: 
 *        password:
 *          type: string
 *          default: 
 *      example:
 *        email: youremail@gmail.com
 *        password: Pass@123 
 */
/**
 * @openapi
 *components:
 *  schemas:
 *   CreateBlogInput:
 *      type: object
 *      required:
 *        - title
 *        - content
 *        - imageUlr
 *        - author
 *      properties:
 *        title:
 *          type: string
 *        content:
 *          type: string

 *        imageUlr:
 *          type: string
 */
/**
 * @openapi
 * components:
 *  schemas:
 *    blog:
 *      type: object
 *      required:
 *        - title
 *        - content
 *        - imageUlr
 *      properties:
 *        title:
 *          type: string
 *        content:
 *          type: string
 *        imageUlr:
 *          type: string
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         message:
 *           type: string
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     blogComment:
 *       type: object
 *       required:
 *         - Names
 *         - Comment
 *       properties:
 *         Names:
 *           type: string
 *           description: The name of the user who created the comment
 *         Comment:
 *           type: string
 *           description: The content of the comment
 *         blog_id:
 *           type: string
 *           description: The unique id of the blog that the comment belongs to
 *         user_id:
 *           type: string
 *           description: The unique id of the user who created the comment
 *       example:
 *        Names: "John Smith"
 *        Comment: "This is a great blog post!"
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     Subscribe:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 */




module.exports = router
