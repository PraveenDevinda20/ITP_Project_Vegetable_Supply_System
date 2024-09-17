import React, { useState, useEffect } from "react";
import axios from "axios";

const CropReadinessList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/crop-readiness', {
          headers: { Authorization: `Bearer ${token}` }  // Assuming you have a token
        });
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h3>Crop Readiness Notifications</h3>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            {notification.cropType} - {notification.quantity}kg - {notification.expectedDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CropReadinessList;
