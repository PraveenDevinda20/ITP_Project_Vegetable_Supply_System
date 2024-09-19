const mongoose = require('mongoose');

// Define Crop Readiness Schema
const cropReadinessSchema = new mongoose.Schema({
  farmer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Farmer',  // Referencing the Farmer model
    required: true 
  },
  cropType: { 
    type: String, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  expectedDate: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    default: 'Pending' 
  }
}, { timestamps: true });

const CropReadiness = mongoose.model('CropReadiness', cropReadinessSchema);
module.exports = CropReadiness;
