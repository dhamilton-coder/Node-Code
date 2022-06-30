
//Imports

const express = require('express')
const User = require('../models/user')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
const router = new express.Router()

//Route for Creating new Task via http POST request

router.post("/tasks", auth,  async (req, res) => {
    const task = new Task({
        ...req.body,
        author: req.user._id
    })
    
    try {
       await task.save()
       res.send(task)
       res.status(201)
    } catch (e) {
        res.status(400)
        res.send(e)
    }
    
})

//Route for Reading all Tasks created by a User via their Session ID Token and GET http request

router.get("/tasks", auth, async (req, res) => {
    const match = {}
    const sort = {}
   
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    
    try {
    await req.user.populate({
        path : 'tasks',
        match,
        options : {
            limit : parseInt(req.query.limit),
            skip : parseInt(req.query.skip),
            sort  
    }})
    res.send(req.user.tasks)
    res.status(200)
    } catch (e) {
    res.status(500).send()
    }
})

//Route for Reading 1 Task from the Task Collection via its Name by a http GET request 

router.get("/tasks/me", auth, async (req, res) => {
    
    try {
        const task = await Task.findOne({ author : req.user._id, task: req.body.task})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400)
    }

})

//Route for Updating a Task from the Tasks collection via http PATCH request

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['task', 'completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

        if (!isValid) {
        return res.status(400).send( {error : 'Invalid Update Data'} )
       }
       
    try {
        const task = await Task.findOne({ author : req.user._id, _id: req.params.id})
       
        if (!task) {
            return  res.status(404).send()
         }
         
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)    
    } catch (e) {
        res.status(400).send()
    }
     
})


router.delete('/tasks/:id', auth , async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ author : req.user._id, _id : req.params.id })

        if (!task) {
            return res.status(404).send()
        }

    res.send(task)    
    } catch (e) {
        res.status(500)
    }
})


// router.delete('/tasks/me', auth , async (req, res) => {
//     try {
//         const tasks = await Task.deleteMany({ author : req.user._id })

//         if (!tasks) {
//             return res.status(404).send()
//         }

//     res.send(tasks)    
//     } catch (e) {
//         res.status(500)
//     }
// })


module.exports = router