const mongoose = require('mongoose')
const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const validator = require('validator')






const User = mongoose.model('User', {
    name: {
       type: String,
       required: true,
       trim: true,
       lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,

        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('lol not a flippin email')
            }
        },
       
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase() === 'password') {
               throw new Error('tsk tsk tsk')
            }
        }
    },

    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a possitive number!')
            }
        }
    }
})

const me = new User({
    name: '     WONG     ',
    email: 'WONG@CHIMAIL.CHOM      ',
    password: '         fgsddd'
})


module.exports = User