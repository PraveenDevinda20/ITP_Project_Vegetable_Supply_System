import React, { useState } from "react";
import axios from "axios";

const CropReadinessForm = () => {
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const readinessData = {
      cropType,
      quantity,
      expectedDate
    };

    try {
      const response = await axios.post('/api/crop-readiness', readinessData, {
        headers: { Authorization: `Bearer ${token}` }  // Assuming you have a token
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to submit notification');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Submit Crop Readiness</h3>
      <input
        type="text"
        placeholder="Crop Type"
        value={cropType}
        onChange={e => setCropType(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        required
      />
      <input
        type="date"
        value={expectedDate}
        onChange={e => setExpectedDate(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CropReadinessForm;
