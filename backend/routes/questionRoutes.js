const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

// Add a new question
router.post('/add', async (req, res) => {
    const { category, question, options, answer } = req.body;
    try {
        const newQuestion = new Question({ category, question, options, answer });
        await newQuestion.save();
        res.status(201).json({ message: 'Question added successfully', question: newQuestion });
    } catch (err) {
        res.status(500).json({ error: 'Error adding question', details: err });
    }
});

// Get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching questions', details: err });
    }
});

// Update a question
router.put('/update/:id', async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ message: 'Question updated', question: updatedQuestion });
    } catch (err) {
        res.status(500).json({ error: 'Error updating question', details: err });
    }
});

// Delete a question
router.delete('/delete/:id', async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting question', details: err });
    }
});

module.exports = router;
