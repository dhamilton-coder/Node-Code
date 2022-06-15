const path = require('path')
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const expressHandlebars = require('express-handlebars')
const { query, json } = require('express')
require('./db/mongoose.js')
const User = require('./models/user.js')
const Task = require('./models/task.js')




const app = express()
const port = process.env.PORT || 3000



//Define paths
const publicDir = path.join('../public')
const viewsDir = path.join('../templates/views')


app.set("views", viewsDir)
app.engine(
    "hbs",
    expressHandlebars.engine({
      defaultLayout: "main.hbs",
      
    })
  );

//set up view engine
app.set("view engine", "hbs");

// Setup Static Dir to use
app.use(express.static(publicDir));
//Telling Express to automaticly parse incoming JSON
app.use(express.json())



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

app.listen(port, () => {
    console.log(chalk.blue(`Server is Up`))
})