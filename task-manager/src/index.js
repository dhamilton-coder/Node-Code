//Imports
const path = require('path')
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const expressHandlebars = require('express-handlebars')
const { query, json } = require('express')
require('./db/mongoose.js')
const User = require('./models/user.js')
const Task = require('./models/task.js')
const { ObjectID } = require('bson')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')



//Port and App constants
const app = express()
const port = process.env.PORT || 3000

//Telling Express to automaticly parse incoming JSON
app.use(express.json())

//Setting up Router for /User and /Task Routes
app.use(userRouter)
app.use(taskRouter)


//Define paths
const publicDir = path.join('./public')
const viewsDir = path.join('./templates/views')

//Set up views
app.set("views", viewsDir)
app.engine(
    "hbs",
    expressHandlebars.engine({
      defaultLayout: "main.hbs",
      
    })
  );

//Set up view engine
app.set("view engine", "hbs");

// Setup Static Dir to use
app.use(express.static(publicDir));

//Routes 
app.get("/", (req, res) => {
    res.render("main" , {
        title: 'Main Page',
        name: 'David',
        layout: false
    })
})


app.listen(port, () => {
    console.log(chalk.blue(`Server is Up`))
})