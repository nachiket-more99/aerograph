const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

let cache = null;

// Define the route to get all airlines
router.get('/all', async (req, res) => {
  try {
    if (cache) {
      console.log('returning from cache');
      return res.json(cache);
    }
    // const airlineCollection = mongoose.connection.collection('airlines');
    // const airlines = await airlineCollection.find({}).toArray();
    // cache = airlines;

    // res.json(airlines);


    const airlines = await mongoose.connection.db.collection('airlines').find({}).toArray();
    cache = airlines;
    res.json(airlines);

  } catch (error) {
    console.error('Error fetching airlines:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
