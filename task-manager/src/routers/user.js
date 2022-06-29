
//Imports

const mongoose = require('mongoose')
const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Task = require('./task')

//Schema to pass into Model

const UserSchema = new mongoose.Schema( {
    name: {
       type: String,
       required: true,
       trim: true,
       lowercase: true,
    },
    email: {
        type: String,
        unique: true,
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
    }, 
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.virtual('tasks', {
    ref: 'task',
    localField: '_id',
    foreignField: 'author'
})

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}


UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

UserSchema.methods.generateAuthToken = async function ()  {
    const user = this
    const token = jwt.sign({ _id : user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

UserSchema.pre('save', async function (next) {
const user = this

if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
}

console.log('just before saving')

    next()
})

UserSchema.pre('remove', async function (next)  {
const user = this
await Task.deleteMany({ author : user._id})
next()
})



//Create New Model Using Mongoose

const User = mongoose.model('User', UserSchema)




module.exports = User