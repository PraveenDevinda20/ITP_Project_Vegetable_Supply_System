import React, { useState } from "react";
import axios from "axios";
import "./AddFarmer.css"; // Import the CSS file for custom styling

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

    function sendData(e) {
        e.preventDefault();

        if (pwd !== cnfrmPwd) {
            alert("Passwords do not match!");
            return;
        }

        const nameRegex = /^[A-Za-z]+$/;

        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            alert("First Name and Last Name can only contain letters.");
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
            pwd
        };

        axios.post("http://localhost:8060/farmer/add", newFarmer).then(() => {
            alert("Farmer added");
        }).catch((err) => {
            alert(err);
        });
    }

    return (
        <div className="farmer-form2">
            <form onSubmit={sendData} className="farmer-form">
                <h2>Farmer Registration</h2>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
                    <input type="text" className="form-control" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Age" value={age} readOnly />
                    <input type="date" className="form-control" placeholder="Date of Birth" onChange={(e) => {
                        setDOB(e.target.value);
                        setAge(calculateAge(e.target.value));
                    }} required />
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Gender" onChange={(e) => setGender(e.target.value)} required />
                    <input type="text" className="form-control" placeholder="NIC" onChange={(e) => setNIC(e.target.value)} required />
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Contact" onChange={(e) => setContact(e.target.value)} required />
                    <input type="text" className="form-control" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required />
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPwd(e.target.value)} required />
                    <input type="password" className="form-control" placeholder="Confirm Password" onChange={(e) => setCnfrmPwd(e.target.value)} required />
                </div>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
}

export default AddFarmer;
