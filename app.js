const routes = require('./router/routes.js')
const express = require("express") 

const mongoose = require("mongoose") //for mongoose
const cookieParser = require('cookie-parser')

////to connect with SWAGGER
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const app = express()

/////////////////////
mongoose.set('strictQuery', true);

const options = {
	definition:{
		openapi:"3.0.0",
		info:{
			title:"MYBrand API",
			version:"1.0.0",
			description:"this is my Brand API Swagger documentation",
			contact: {
				name: 'IYADUKUNZE Emile',
				email: 'iyaemile4@gmail.com',
			  },
		},
		components: {
			securitySchemes: {
			  jwt: {
				type: 'http',
				scheme: 'bearer',
				in: 'header',
				bearerFormat: 'JWT'
			  }
			}
		  },
		  security: [
			{
			  jwt: []
			}
		  ],
		servers:[
			{
				url:"http://localhost:4000"
			}
		],
		
	},
	apis:["./router/*.js"]
}


const specs = swaggerJsDoc(options)

// app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(specs))

function swaggerDocs(app, port) {
	// Swagger Page
	app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
  
	// Documentation in JSON format
	app.get('/docs.json', (req, res) => {
	  res.setHeader('Content-Type', 'application/json')
	  res.send(swaggerSpec)
	})
  }



/////////////////

app.use(express.json())
app.use(cookieParser())
app.use(routes)

mongoose
	.connect("mongodb+srv://Emile:KwaNgujezcHJkvEf@cluster0.ancg36w.mongodb.net/MyBrandfDB?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(async () => {
		await app.listen("mongodb+srv://Emile:KwaNgujezcHJkvEf@cluster0.ancg36w.mongodb.net/MyBrandfDB?retryWrites=true&w=majority", () => { //here changed by adding process.env.PORT
			console.log("Your Server has started on port 4000!")
			swaggerDocs(app, "mongodb+srv://Emile:KwaNgujezcHJkvEf@cluster0.ancg36w.mongodb.net/MyBrandfDB?retryWrites=true&w=majority")
		})
	}).catch((err) => {
		console.log(err)
	})


module.exports = { app }
