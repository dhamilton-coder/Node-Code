
//Imports

const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
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
        res.send({ user, token })

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
    
//Route for Reading 1 User from Users Collection via their _id by a http GET request 

router.get("/users/:id", async (req, res) => {
 const _id = req.params.id
 
 
 User.findById(_id).then((user) => {

    if (!user) {
    return res.status(404).send()
    }

    res.send(user)    
 }).catch((e) => {
    res.send(e)
 })
 
console.log(req.params)

})

//Route for Updating a User from the Users collection via http PATCH request

router.patch('/users/:id', async (req, res) => {
const _id = req.params.id
const updates = Object.keys(req.body)
const allowedUpdates = ['name', 'email', 'password', 'age']
const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
   
if (!isValidOperation) {
    return res.status(400).send( { error : 'Invalid Updates'} )
}

try {
    const user = await User.findById(_id)

    if (!user) {
        return  res.status(404).send()
     }

    updates.forEach((update) => {
        user[update] = req.body[update]
    })

    await user.save()
        res.send(user)
}   catch (e) {
    res.status(400).send()
}
})

//Route for deleting users via their id

router.delete('/users/:id', async (req, res) => {
    try {
       
        const user = await User.findByIdAndDelete(req.params.id)
       
        if (!user) {
        return res.status(404).send()
       }
        
       res.send(user)
    } catch (e) {
       res.status(500).send()
    }
})






module.exports = router