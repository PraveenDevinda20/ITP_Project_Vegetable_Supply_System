import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { validateFarmerData } from "../utils/validators";
import "./updateFarmer.css";

function UpdateFarmer() {
  const { id } = useParams(); // Get the farmer ID from the URL
  const navigate = useNavigate(); // For navigation after update

  const [farmerData, setFarmerData] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    age: "",
    gender: "",
    NIC: "",
    address: "",
    email: "",
    contact: "",
    password: "",
  });

  useEffect(() => {
    // Fetch the farmer's details by ID
    axios
      .get(`http://localhost:8060/farmer/get/${id}`)
      .then((res) => {
        setFarmerData(res.data.farmer);
      })
      .catch((err) => {
        alert("Error fetching farmer data: " + err.message);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFarmerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate data
    const validationErrors = validateFarmerData(farmerData);

    if (validationErrors.length > 0) {
      alert(validationErrors.join("\n"));
      return;
    }

    axios
      .put(`http://localhost:8060/farmer/update/${id}`, farmerData)
      .then(() => {
        alert("Farmer updated successfully");
        navigate("/"); // Redirect to the list of all farmers
      })
      .catch((err) => {
        alert("Error updating farmer: " + err.message);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Update Farmer Details</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={farmerData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={farmerData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="DOB" className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="DOB"
            name="DOB"
            value={farmerData.DOB.split('T')[0]} // Format date for input
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            value={farmerData.age}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender" className="form-label">Gender</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            name="gender"
            value={farmerData.gender}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="NIC" className="form-label">NIC</label>
          <input
            type="text"
            className="form-control"
            id="NIC"
            name="NIC"
            value={farmerData.NIC}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={farmerData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={farmerData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact" className="form-label">Contact</label>
          <input
            type="text"
            className="form-control"
            id="contact"
            name="contact"
            value={farmerData.contact}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={farmerData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Farmer</button>
      </form>
    </div>
  );
}

export default UpdateFarmer;
