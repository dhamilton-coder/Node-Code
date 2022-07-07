
//Imports

const mongoose = require('mongoose')
const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const validator = require('validator')
const url = process.env.MONGODB_URL
//Connecting mongoose to Collection on local DB

mongoose.connect( url , {
    useNewURLParser: true,
})












