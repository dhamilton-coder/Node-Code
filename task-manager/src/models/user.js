
//Imports

const mongoose = require('mongoose')
const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const bcrypt = require('bcryptjs')
const validator = require('validator')

const UserSchema = new mongoose.Schema( {
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


UserSchema.pre('save', async function (next) {
const user = this

if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
}

console.log('just before saving')

    next()
})

UserSchema.pre('updateOne', async function (next) {
const user = this

console.log('Test message')
})


//Create New Model Using Mongoose

const User = mongoose.model('User', UserSchema)




module.exports = User