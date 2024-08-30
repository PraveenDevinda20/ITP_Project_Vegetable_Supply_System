const express = require('express');
const router = express.Router();
const PickupRequest = require('../models/pickup');

// Create a new pickup request
router.post('/add', async (req, res) => {
  try {
    const pickupRequest = new PickupRequest(req.body);
    await pickupRequest.save();
    res.status(201).json(pickupRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all pickup requests
router.get('/', async (req, res) => {
  try {
    const pickupRequests = await PickupRequest.find();
    res.status(200).json(pickupRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single pickup request by ID
router.get('/get/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const pickupRequest = await PickupRequest.findById(id);
      if (!pickupRequest) {
        return res.status(404).json({ error: 'Pickup request not found' });
      }
      res.status(200).json(pickupRequest);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Update a pickup request by ID
  router.put('/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedPickupRequest = await PickupRequest.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedPickupRequest) {
        return res.status(404).json({ error: 'Pickup request not found' });
      }
      res.status(200).json(updatedPickupRequest);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete a pickup request by ID
  router.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPickupRequest = await PickupRequest.findByIdAndDelete(id);
      if (!deletedPickupRequest) {
        return res.status(404).json({ error: 'Pickup request not found' });
      }
      res.status(200).json({ message: 'Pickup request deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;
