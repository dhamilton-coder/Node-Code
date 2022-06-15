const mongoose = require('mongoose')
const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const validator = require('validator')


mongoose.connect('mongodb://127.0.0.1:27017/taskManagerAPI', {
    useNewURLParser: true,
})




// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })



const Task = mongoose.model('Task', {
    task: {
        type: String,
        required: true,
        trim: true
    },

    completed: {
        type: Boolean,
        default: false
    }

})

const Violin = new Task({
    task: '   Violin      ',
    
})

// Violin.save().then(() => {
//     console.log(Violin)
// }).catch((error) => {
//     console.log(error)
// })












