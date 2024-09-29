require('dotenv').config();
const { MongoClient } = require('mongodb');

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = `${process.env.MONGO_DB}`;

async function connectToDatabase() {
    // If dbInstance already exists, return it (to avoid multiple connections)
    if (dbInstance) {
        return dbInstance;
    }

    try {
        // Task 1: Connect to MongoDB
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to MongoDB');

        // Task 2: Connect to the database and store in dbInstance
        dbInstance = client.db(dbName);
        console.log(`Connected to database: ${dbName}`);

        // Task 3: Return the database instance
        return dbInstance;
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;  // Let the error bubble up for proper error handling in the app
    }
}

module.exports = connectToDatabase;
