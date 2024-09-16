import React, { useState } from "react";
import FarmerImage from "../images/pexels-rdne-8540948.jpg";
import axios from "axios";

function AddFarmer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [DOB, setDOB] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [NIC, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [pwd, setPwd] = useState("");
  const [cnfrmPwd, setCnfrmPwd] = useState("");

  // Function to calculate age based on DOB
  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Restrict date range for the Date of Birth
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 60, today.getMonth(), today.getDate()).toISOString().split("T")[0]; // Age 60
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split("T")[0]; // Age 18

  // NIC validation function
  function validateNIC() {
    const dobYear = new Date(DOB).getFullYear();
    const dobYearLast2 = dobYear.toString().slice(-2); // Last 2 digits of DOB year

    if (NIC.length === 12) {
      const nicYear = NIC.slice(0, 4); // First 4 digits for NIC year
      const nicDays = parseInt(NIC.slice(4, 7)); // 5th to 7th digit for days of the year
      if (nicYear !== dobYear.toString()) {
        alert("NIC year does not match Date of Birth year.");
        return false;
      }
      if (gender === "Male" && nicDays >= 500) {
        alert("For males, NIC day values should be below 500.");
        return false;
      } else if (gender === "Female" && nicDays < 500) {
        alert("For females, NIC day values should be 500 or above.");
        return false;
      }
    } else if (NIC.length === 10 && /^[0-9]{9}[Vv]$/.test(NIC)) {
      const nicYear = NIC.slice(0, 2); // First 2 digits for NIC year
      const nicDays = parseInt(NIC.slice(2, 5)); // 3rd to 5th digit for days of the year
      if (nicYear !== dobYearLast2) {
        alert("NIC year does not match Date of Birth year.");
        return false;
      }
      if (gender === "Male" && nicDays >= 500) {
        alert("For males, NIC day values should be below 500.");
        return false;
      } else if (gender === "Female" && nicDays < 500) {
        alert("For females, NIC day values should be 500 or above.");
        return false;
      }
    } else {
      alert("Invalid NIC format. It should be either 12 digits or 9 digits followed by 'V'.");
      return false;
    }
    return true;
  }

  function sendData(e) {
    e.preventDefault();

    if (pwd !== cnfrmPwd) {
      alert("Passwords do not match!");
      return;
    }

    if (!validateNIC()) {
      return;
    }

    const calculatedAge = calculateAge(DOB);

    const newFarmer = {
      firstName,
      lastName,
      DOB,
      age: calculatedAge,
      gender,
      NIC,
      address,
      email,
      contact,
      pwd,
    };

    axios
      .post("http://localhost:8060/farmer/add", newFarmer)
      .then(() => {
        alert("Farmer added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="flex justify-center items-center p-8 bg-white shadow-md rounded-lg">
      {/* Image Section */}
      <div className="hidden lg:block lg:w-1/2 p-4">
        <img
          src={FarmerImage}
          alt="Farmer illustration"
          className="rounded-lg"
        />
      </div>

      {/* Form Section */}
      <div className="lg:w-1/2">
        <form onSubmit={sendData} className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Farmer Registration
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              className="form-input border border-gray-400 rounded-md p-2"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              className="form-input border border-gray-400 rounded-md p-2"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              className="form-input border border-gray-400 rounded-md p-2"
              placeholder="Date of Birth"
              min={minDate}
              max={maxDate}
              onChange={(e) => {
                setDOB(e.target.value);
                setAge(calculateAge(e.target.value));
              }}
              required
            />
            <input
              type="number"
              className="form-input border border-gray-400 rounded-md p-2"
              placeholder="Age"
              value={age}
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              className="form-select border border-gray-400 rounded-md p-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              className="form-input border border-gray-400 rounded-md p-2"
              placeholder="NIC"
              onChange={(e) => setNIC(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              className="form-input border border-gray-400 rounded-md p-2"
              placeholder="Contact No."
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              className="form-input border border-gray-400 rounded-md p-2"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <input
              type="email"
              className="form-input border border-gray-400 rounded-md p-2"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="password"
              className="form-input border border-gray-400 rounded-md p-2"
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-input border border-gray-400 rounded-md p-2"
              placeholder="Confirm Password"
              onChange={(e) => setCnfrmPwd(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFarmer;
