const Question = require("../models/questionModel");

// Create a new question
exports.createQuestion = async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update an existing question
exports.updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(updatedQuestion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json({ message: "Question deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all questions
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
