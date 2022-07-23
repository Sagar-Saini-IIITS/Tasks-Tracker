const express = require('express');
const router = express.Router();
const Task = require('../models/Tasks');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


// ROUTE 1
// adding new tasks

router.post('/addtasks', fetchuser, [
    body('title', 'Enter a title of lenght > 3').isLength({ min: 3 }),
    body('description', 'Enter a description of length > 5').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        const task = new Task({ title, description, tag, user: req.user.id });
        const savedTask = await task.save();
        res.json(savedTask);

    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured");
    }
})





// ROUTE 2
// fetching all tasks of user

router.get('/fetchalltasks', fetchuser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured");
    }
})





// ROUTE 3
// updating tasks

router.put('/updatetasks/:id', fetchuser, async (req, res) => {
      const {title,description,tag}=req.body;
      const newTask = {};
      if(title){
          newTask.title=title;
      }
      if(description){
        newTask.description=description;
    }
    if(tag){
        newTask.tag=tag;
    }
    try {
    let task = await Task.findById(req.params.id);
    if(!task){
        return res.status(404).send("Tasks not Found");
    }
    if(task.user.toString()!=req.user.id){
        return res.status(404).send("Not allowed");
    }
    task = await Task.findByIdAndUpdate(req.params.id,{$set:newTask},{new:true}); 
    res.json({task});
} catch (error) {
    console.log(error);
    res.status(500).send("Some error occured"); 
}
})





// ROUTE 4
// deleting task

router.delete('/deletetasks/:id', fetchuser, async (req, res) => {
  try {
  let task = await Task.findById(req.params.id);
  if(!task){
      return res.status(404).send("Not Found");
  }
  if(task.user.toString()!=req.user.id){
      return res.status(404).send("Not allowed");
  }
  task = await Task.findByIdAndDelete(req.params.id); 
  res.json({"Success": "task deleted",task: task});
} catch (error) {
    console.log(error);
    res.status(500).send("Some error occured"); 
}
})


module.exports = router