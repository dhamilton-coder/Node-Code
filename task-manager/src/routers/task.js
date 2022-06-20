const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

//Route for Creating new Task via http POST request

router.post("/tasks", async (req, res) => {
    const task = new Task(req.body)
    
    try {
       await task.save()
       res.send(task)
       res.status(201)
    } catch (e) {
        res.status(400)
        res.send(e)
    }
    
})

//Route for Reading all instances of the Task model from Tasks Collection via http GET request

router.get("/tasks", async (req, res) => {
    try {
    const tasks = await  Task.find({})
    res.send(tasks)
    res.status(200)
    } catch (e) {
    res.status(500)
    res.send(e)
    }
    
})

//Route for Reading 1 Task from the Task Collection via their _id by a http GET request 

router.get("/tasks/:id", (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((user) => {
        if (!user) {
    return res.status(404).send()
        }
    res.send(user)
    }).catch((e) => {
        res.status(500)
        res.send(e)
    })
})

//Route for Updating a Task from the Tasks collection via http PATCH request

router.patch('/tasks/:id', (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['task', 'completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

        if (!isValid) {
        return res.status(400).send( {error : 'Invalid Update Data'} )
        }
    
    Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}).then((user) => {
        if (!user) {
         return res.status(404).send()
        } 
            res.send(user)
        }).catch((e) => {
            res.status(400).send()
        })    
})


router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

    res.send(task)    
    } catch (e) {
        res.status(500)
    }
})


module.exports = router