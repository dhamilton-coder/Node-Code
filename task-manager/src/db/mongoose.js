
//Imports

const mongoose = require('mongoose')
const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const validator = require('validator')
const url = 'mongodb://127.0.0.1:27017/taskManagerAPI'
//Connecting mongoose to Collection on local DB

mongoose.connect( url , {
    useNewURLParser: true,
})












