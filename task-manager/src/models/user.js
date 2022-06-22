
//Imports

const mongoose = require('mongoose')
const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const bcrypt = require('bcryptjs')
const validator = require('validator')

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
    }
})


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

UserSchema.pre('save', async function (next) {
const user = this

if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
}

console.log('just before saving')

    next()
})

//Create New Model Using Mongoose

const User = mongoose.model('User', UserSchema)




module.exports = User