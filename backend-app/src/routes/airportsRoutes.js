const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

let cache = null;

// Define the route to get all airports
router.get('/all', async (req, res) => {
  try {
    if (cache) {
      console.log('returning from cache');
      return res.json(cache);
    }
    const airportsCollection = mongoose.connection.collection('airports');
    const airports = await airportsCollection.find({}).toArray();
    cache = airports;

    res.json(airports);
  } catch (error) {
    console.error('Error fetching airports:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
