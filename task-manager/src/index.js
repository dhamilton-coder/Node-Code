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



//Ports and App
const app = express()
const port = process.env.PORT || 3000



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
//Telling Express to automaticly parse incoming JSON
app.use(express.json())



//Routes 


app.get("/", (req, res) => {
    res.render("main" , {
        title: 'Main Page',
        name: 'David',
        layout: false
    })
})


app.post("/users", (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user).catch((error) => {
        res.status(400)
        res.send(error)
        })
    })
})


app.get("/users", (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500)
        res.send(e)
    })
})


app.get("/users/:id", (req, res) => {
 const _id = req.params.id
 User.findById(_id).then((user) => {
    if (!user) {
    return res.status(404)
    }
    res.send(user)    
 }).catch((e) => {
    res.send(e)
 })
 
console.log(req.params)

})

app.post("/tasks", (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201)
        res.send(task)
    }).catch((e) => {
        res.status(400)
        res.send(e)
    })
})


app.get("/tasks", (req, res) => {
    Task.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500)
        res.send(e)
    })
})

app.get("/tasks/:id", (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((user) => {
        if (!user) {
    return res.status(404).send()
        }
    res.send(user)
    }).catch((e) => {
        res.status(500)
        res.send(e)
    })
})




app.listen(port, () => {
    console.log(chalk.blue(`Server is Up`))
})