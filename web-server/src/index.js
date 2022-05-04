const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const hbs = require('hbs');
const { query } = require('express');
const request = require('request')
const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')


const app = express();
const port = process.env.PORT || 3000



// Define paths for Express Config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set("views", viewsDir);
app.engine(
  "hbs",
  expressHandlebars.engine({
    defaultLayout: "main.hbs",
    layoutDir: partialsPath
    
  })
);

hbs.registerPartials(partialsPath)

// Set up handlebars engine
app.set("view engine", "hbs");




// Setup Static Dir to use
app.use(express.static(publicDir));

app.get("/", function(req, res) {
  res.render("index", {
    title: 'Weather App',
    name: 'David Hamilton',
    layout: false
  });
});


app.get("/about", function(req, res) {
  res.render("about", {
    title: 'The About Page',
    name: 'David Hamilton',
    layout: false
  });
});

app.get("/help", function(req, res) {
  res.render("help", {
    title: 'The Help Page',
    name: 'David Hamilton',
    layout: false
  });
});





app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send('Please provide an Adress!')
  }else {
    const adress = (req.query.address)
    geocode(adress, (error, data) => {
      if (error) {
        res.send({
          error: error
        })
          return console.log(error)
      }
forecast(data.latitude, data.longtitude, (error, response) => {
     if (error)  {
              res.send({
                error: error
              })
              return console.log(error)
     }
     res.send({
       location: data.location,
       forecast: response
     })

     
      
})
})
}
}),

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send('No search provided!')
  } else {
    console.log(req.query)
    res.send({
    
    products: [req.query.address]
  })
  }
}),

app.get("/help/*", function(req, res) {
  res.render("help-article", {
    title: 'Help Article Not found (404)',
    name: 'David Hamilton',
    error: 'Help Article Not Found!',
    layout: false
  });
});

app.get("/about/*", function(req, res) {
  res.render("about-404", {
    title: 'Page Not Found (404)',
    name: 'David Hamilton',
    error: 'The page you are trying to access does not exist!',
    layout: false
  });
});


app.get("*", function(req, res) {
  res.render("404", {
    title: 'Page Not Found (404)',
    name: 'David Hamilton',
    error: 'The page you are trying to access does not exist!',
    layout: false
  });
});





app.listen(port, () => {
  console.log(chalk.blue("Server is up on port " + port))
})
