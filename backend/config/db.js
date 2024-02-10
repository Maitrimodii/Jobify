const mongoose = require('mongoose');
const colors = require('colors');

// Function to connect to the MongoDB database
const DbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        // Log successful connection
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        // Log and handle connection errors
        console.error(`Error: ${error.message}`.red.bold);
        process.exit(1); // Exit the process with a non-zero status code on error
    }
};

module.exports = DbConnect;
