const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a task
router.post('/', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});

// Mark task as completed
router.patch('/:id/complete', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error marking task as completed' });
    }
});

module.exports = router;
