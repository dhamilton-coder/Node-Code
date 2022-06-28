//Imports

const mongoose = require('mongoose')
const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const validator = require('validator')

//Schema to pass into Model

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },

    completed: {
        type: Boolean,
        default: false
    }, 
    
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

})

taskSchema.pre('save', function(next) {
const task = this

console.log('Before a save')

next()
})




//Create New Model Using Mongoose

const Task = mongoose.model('task', taskSchema)


module.exports = Task