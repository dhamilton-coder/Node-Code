
const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.get('/test', (req, res) => {
    res.send('Test')
})

//Route for Creating new User via http POST request

router.post("/users", async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.send(user)
        res.status(201)
    } catch (e) {
        res.status(400)
    }

  
})

//Route for Reading all instances of the User model from Users Collection via http GET request

router.get("/users",  async (req, res) => {
    
    try {
    const users = await User.find({})
    res.send(users)
    res.status(200)
    } catch(e) {
    res.status(500)
    res.send(e)
    }
 
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
    const user = await User.findByIdAndUpdate(_id, req.body, { new : true, runValidators: true})
    if (!user) {
       return  res.status(404).send()
    }
        res.send(user)
}   catch (e) {
    res.status(400).send()
}
})


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