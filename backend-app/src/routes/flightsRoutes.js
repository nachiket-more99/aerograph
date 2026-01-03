const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

let cache = null;

// Define the route to get all flights
router.get('/all', async (req, res) => {
  try {
    if (cache) {
      console.log('returning from cache');
      return res.json(cache);
    }
    const flightsCollection = mongoose.connection.collection('flights');
    const flights = await flightsCollection.find({}).toArray();
    cache = flights;

    res.json(flights);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
