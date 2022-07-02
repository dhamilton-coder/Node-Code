
//Imports

const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()


//Route for Creating new User via http POST request

router.post("/users", async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.send(user)
        res.status(201)
    } catch (e) {
        res.status(400).send(e)
    }

  
})

//Route for logging in Users via their email and password

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user , token })
   
    } catch (e) {
        res.status(400).send()
    }
})

//Route for signing up users

router.post('/users/signin', async (req, res) => {
    try {
        const user = await new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201)
        res.send({ user , token })

    } catch (e) {
        res.status(400).send()
    }
})

//Route for Logging out users by deleting Session ID token

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth,  async (req, res) => {
    try {
        req.user.tokens = []
        req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})


//Route for Reading A User Profile via their Session ID token

router.get("/users/me", auth, async (req, res) => {
 res.send(req.user)
})

//Route for Updating a User from the Users collection via http PATCH request

router.patch('/users/me', auth,  async (req, res) => {
const updates = Object.keys(req.body)
const allowedUpdates = ['name', 'email', 'password', 'age']
const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
   
if (!isValidOperation) {
    return res.status(400).send( { error : 'Invalid Updates'} )
}

try {
    updates.forEach((update) => {
        req.user[update] = req.body[update]
    })

    await req.user.save()
        res.send(req.user)
}   catch (e) {
    res.status(400).send()
}
})

//Route for deleting users via their Session ID token

router.delete('/users/me', auth,  async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


const upload = multer({
    limits : {
        fileSize: 3000000
    }, fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(new Error ('File must be an Image'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/profile', auth, upload.single('upload'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send()
    }
    
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error : error.message})
})


router.delete('/users/me/profile', auth, async (req, res) => {
    req.user.avatar = undefined
    req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error : error})
})


router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error('No Profile Found')
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send({ error : e.message})
    }
})

module.exports = router