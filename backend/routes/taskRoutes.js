const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
    const { name, description, priority, dueDate } = req.body;

    if (!name || !description || !priority || !dueDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newTask = new Task({ name, description, priority, dueDate });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task' });
    }
});

// Fetch all tasks with an optional priority filter
router.get('/', async (req, res) => {
    const { priority } = req.query;

    try {
        const query = priority && priority !== 'all' ? { priority } : {};
        const tasks = await Task.find(query);
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Fetch task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        res.status(500).json({ message: 'Error fetching task by ID' });
    }
});

// Update task by ID
router.put('/:id', async (req, res) => {
    const { name, description, priority, dueDate } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { name, description, priority, dueDate },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task' });
    }
});

// Delete task by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task' });
    }
});

module.exports = router;
