const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const connectToDB = async () => {
    try {
        const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/quizSystem';
        await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1); // Exit the application if the database connection fails
    }
};

connectToDB();

// Routes
app.use('/api/questions', questionRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Quiz Management API!');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
