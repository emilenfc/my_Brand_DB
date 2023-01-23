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
*             $ref: '#/components/schemas/userUser'
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
* "/deleteOneUser/{id}":
*   delete:
*      tags: [Admin Operation]
*      summary: delete one user
*      parameters:
*        - name: id
*          in: path
*          required: true
*          description: provide The unique id of the user
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
router.get("/allBlogs", controllers.allBlogs)

/////////////Get individual blog TEST :
/**
 * @openapi
 * /blog/{id}:
 *    get:
 *      tags: [Admin Operation]
 *      summary: get comment
 *      parameters:
 *         - name: "id"
 *           in: path
 *           type: string
 *           required: true
 *           description: provide blogId
 *      responses:
 *        200:
 *          description: success
 *        400:
 *          description: invalid request
 *        401:
 *          descriprion: Unauthorized
 */

router.get("/blog/:id", controllers.getOneBlog)

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
 * /updateBlog/{id}:
 *   patch:
 *     summary: update a single blog
 *     description: only admin can update
 *     tags: [Admin Operation]
 *     parameters:
 *      - name: "id"
 *        in: path
 *        required: true
 *        description: provide blogId
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
 * /deleteOneBlog/{id}:
 *    delete:
 *      summary: delete one blog.
 *      tags: [Admin Operation]
 *      description: deleting a one blog, should provide blog id from our database
 *      parameters:
 *        - name: "id"
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
 *    delete:
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
router.get("/Blogs", controllers.allBlogs)

/////////////////////////comments
/**
 * @openapi
 * /comments/{blog_id}:
 *    post:
 *      tags: [Blog Comment]
 *      summary: Add a new comment
 *      parameters:
 *         - name: "blog_id"
 *           in: path
 *           type: string
 *           required: true
 *           description: provide blogId
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/blogComment'
 *      responses:
 *        200:
 *          description: success
 *        400:
 *          description: invalid request
 *        401:
 *          descriprion: Unauthorized
 */

router.post("/comments/:blog_id", checkUser, controllers.createComment)
/**
 * @openapi
 * /blogComments/{blog_id}:
 *    get:
 *      tags: [Blog Comment]
 *      summary: get comment
 *      parameters:
 *         - name: "blog_id"
 *           in: path
 *           type: string
 *           required: true
 *           description: provide blogId
 *      responses:
 *        200:
 *          description: success
 *        400:
 *          description: invalid request
 *        401:
 *          descriprion: Unauthorized
 */


router.get("/blogComments/:blog_id", controllers.getBlogComments)
/**
 * @openapi
 * '/getAllCommetsofAllBlogs':
 *   get:
 *     summary: Get all CommentsofAllBlogs
 *     operationId: getAllCommetsofAllBlogs
 *     tags:
 *       - Blog Comment
 *     responses:
 *       '200':
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       '401':
 *         description: Unauthorized(this is Admin operation)
 */
router.get("/getAllCommetsofAllBlogs",requireAuth, controllers.getAllCommetsofAllBlogs)


//////////////////////// like and unlike
/**
 * @openapi
 * "/like/{blog_id}":
 *    post:
 *      summary: like a blog
 *      tags: [User activities]
 *      parameters:
 *         - name: "blog_id"
 *           in: path
 *           type: string
 *           required: true
 *           description: provide The unique id of the blog
 *           schema:
 *            type: "string"
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

router.post("/like/:blog_id", checkUser, controllers.like)
router.get("/allikes/:blog_id", controllers.getBloglikes)
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
 *     summary: create a new message
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
//63ccceecab4f5e0b45903cbe
/**
 * @openapi
 * /deleteMessage/{id}:
 *    delete:
 *      summary: delete one message.
 *      tags: [USER Messages]
 *      description: deletes a message by providing its id
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          required: true
 *          description: The id of the message to delete
 *          schema:
 *            type: "string"
 *      responses:
 *        200:
 *          description: success deleted
 *        400:
 *          description: Invalid message id provided
 *        404:
 *          description: Message not found
 *        500:
 *          description: Internal server error
 */

router.delete("/deleteMessage/:id", requireAuth,controllers.deleteMessage)

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
 * @openapi
 * '/dltAllsubscribers':
 *    delete:
 *      summary: delete all blog
 *      tags: [SUBSCRIBE]
 *      description: delete all subscribers from our database
 *      responses:
 *        200:
 *          description: All subscribers are deleted
 *        401:
 *          description: Unauthorized(this is Admin operation)
 */
router.delete('/dltAllsubscribers', requireAuth, controllers.deleteAllSubscribers)

/**
 * @openapi
 * /deleteOneSubscriber/{id}:
 *    delete:
 *      summary: delete one subscriber.
 *      tags: [SUBSCRIBE]
 *      description: deletes a message by providing its id
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          required: true
 *          description: The id of the message to delete
 *          schema:
 *            type: "string"
 *      responses:
 *        200:
 *          description: success deleted
 *        400:
 *          description: Invalid id provided
 *        404:
 *          description: Subscriber not found
 *        500:
 *          description: Internal server error
 */

router.delete("/deleteOneSubscriber/:id", requireAuth,controllers.deleteOneSubscribers)
// /**
//  * components:
//  *   schemas:
//  *     user:
//  *       type: object
//  *       properties:
//  *         email:
//  *           type: string
//  *           required:true
//  *         password:
//  *           type: string
//  *           required: true
//  *           
//  */

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
 * components:
 *  schemas:
 *    userUser:
 *      type: object
 *      required:
 *        - firstName
 *        - secondName
 *        - phone
 *        - email
 *        - password
 *      properties:
 *        firstName:
 *          type: string
 *        secondName:
 *          type: string
 *        phone:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *      example:
 *        firstName: Kamana
 *        secondName: Eric
 *        phone: '0780000000'
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
 *        - text
 *        - image
 *        - author
 *      properties:
 *        title:
 *          type: string
 *        author:
 *          type: string
 *        text:
 *          type: string

 *        image:
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
 *        - author
 *        - text
 *        - image
 *      properties:
 *        title:
 *          type: string
 *        author:
 *          type: string
 *        text:
 *          type: string
 *        image:
 *          type: string
 *        Time:
 *          type: string
 */


/**
 * @openapi
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *         Time:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         message:
 *           type: string
 *       example:
 *        name: "kamana angle"
 *        email: "kama@gmail.com"
 *        message: "Hello!"
 *        date: "12/2/2022"
 *        Time: "10:30:32"


 */
/**
 * @openapi
 * components:
 *   schemas:
 *     blogComment:
 *       type: string
 *       required:
 *         - date
 *         - Time
 *         - Names
 *         - Comment
 *         - blog_Id
 *       properties:
 *         date:
 *           type: string
 *           description: The date of the comment
 *         Time:
 *           type: string
 *           description: The time of the comment
 *         Names:
 *           type: string
 *           description: The name of the user who created the comment
 *         Comment:
 *           type: string
 *           description: The text of the comment
 *         blog_Id:
 *           type: string
 *           description: The unique id of the blog that the comment belongs to
 *         user_Id:
 *           type: string
 *           description: The unique id of the user who created the comment
 *       example:
 *        date: "12/2/2022"
 *        Time: "10:30:32"
 *        Names: "John Smith"
 *        Comment: "This is a great blog post!"
 *        blog_Id: "5f8ab6c1a6b3d6c3f6b8a6c2"
 *        user_Id: "5f8ab6c1a6b3d6c3f6b8a6c1"
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
