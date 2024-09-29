const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Search for gifts
router.get('/', async (req, res, next) => {
    try {
        // Task 1: Connect to MongoDB using connectToDatabase database.
        const db = await connectToDatabase();

        const collection = db.collection("gifts");

        // Initialize the query object
        let query = {};

        // Task 2: Check if the name exists and is not empty
        if (req.query.name && req.query.name.trim() !== '') {
            query.name = { $regex: req.query.name, $options: "i" }; // Using regex for partial match, case-insensitive
        }

        // Task 3: Add other filters to the query
        if (req.query.category) {
            query.category = req.query.category; // Adding category filter
        }
        if (req.query.condition) {
            query.condition = req.query.condition; // Adding condition filter
        }
        if (req.query.age_years) {
            query.age_years = { $lte: parseInt(req.query.age_years) }; // Adding age_years filter
        }

        // Task 4: Fetch filtered gifts using the find(query) method.
        const gifts = await collection.find(query).toArray(); // Fetching the filtered items

        res.json(gifts); // Sending the results back to the client
    } catch (e) {
        next(e); // Handling any errors
    }
});

module.exports = router;
