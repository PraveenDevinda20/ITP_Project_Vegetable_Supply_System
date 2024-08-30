const mongoose = require('mongoose');

const pickupRequestSchema = new mongoose.Schema({
  pickupRequestID: {
    type: String,
    required: true,
    unique: true
  },
  farmerID: {
    type: String,
    required: true
  },
  farmerName: {
    type: String,
    required: false
  },
  pickupDate: {
    type: Date,
    required: true
  },
  pickupTime: {
    type: String,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  deliveryLocation: {
    type: String,
    required: false
  },
  vehicleType: {
    type: String,
    required: true
  },
  numberOfBoxes: {
    type: Number,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  specialInstructions: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending'
  }
}, { timestamps: true });

const PickupRequest = mongoose.model('PickupRequest', pickupRequestSchema);

module.exports = PickupRequest;

