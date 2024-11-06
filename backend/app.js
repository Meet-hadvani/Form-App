const express = require('express');
const cors = require('cors'); // Add this line
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;
const uri = process.env.MONGO_URI;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Add this line to enable CORS for all origins

// MongoDB client and connection
const client = new MongoClient(uri);
let db;

// Connect to MongoDB and initialize `db`
async function connectToDatabase() {
  if (!db) {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db('mydatabase'); // Use your database name
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }
  return db;
}

// Save form data route
app.post('/api/forms/save', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const formsCollection = db.collection('forms'); // Collection to save form data

    // Insert form data
    const result = await formsCollection.insertOne(req.body);
    res.status(201).json({ message: 'Form data saved successfully', result });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Failed to save form data', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
