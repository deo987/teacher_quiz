const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    category: { type: String, required: true },
    question: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: String, required: true },
});

module.exports = mongoose.model('Question', questionSchema);


// const mongoose = require("mongoose");

// const questionSchema = new mongoose.Schema({
//     category: String,
//     question: String,
//     options: [String],
//     answer: String
// });

// module.exports = mongoose.model("Question", questionSchema);