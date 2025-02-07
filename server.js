const express = require('express');
const app = express();
const dataBase = require('./dataBase');
const { default: mongoose } = require('mongoose');
require('dotenv').config();


// Route for /ping with basic error handling
app.get('/', (req, res) => {
    try {
        res.send('Congratulation your.... hmmm(I mean Harsh) your database is connected!');
    } catch (error) {
        res.status(500).send('An error occurred!');
    }
});

dataBase();


// Use an environment variable for the port with a fallback to 8000
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


