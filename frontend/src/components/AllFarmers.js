import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AllFarmers.css"

function AllFarmers() {
  const [farmers, setFarmers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    function getFarmers() {
      axios
        .get("http://localhost:8060/farmer/")
        .then((res) => {
          setFarmers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getFarmers();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update/${id}`); // Navigate to the update page with the farmer's ID
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this farmer?")) {
      axios
        .delete(`http://localhost:8060/farmer/delete/${id}`)
        .then(() => {
          setFarmers(farmers.filter((farmer) => farmer._id !== id));
        })
        .catch((err) => {
          alert("Error deleting farmer: " + err.message);
        });
    }
  };
  return (
    <div className="containert">
      <h1>All Farmers</h1>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>NIC</th>
            <th>Address</th>
            <th>Contact No.</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer, index) => (
            <tr key={index}>
              <td>{farmer.firstName}</td>
              <td>{farmer.lastName}</td>
              <td>{farmer.DOB}</td>
              <td>{farmer.email}</td>
              <td>{farmer.age}</td>
              <td>{farmer.gender}</td>
              <td>{farmer.NIC}</td>
              <td>{farmer.address}</td>
              <td>{farmer.contact}</td>
              <td>{farmer.password}</td>
              <td>
                <div className="d-flex">
                  <Link
                    to={`/update/${farmer._id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(farmer._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllFarmers;
