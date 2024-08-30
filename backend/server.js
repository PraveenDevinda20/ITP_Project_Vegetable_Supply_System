const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8060;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
    .then(() => {
        console.log("MongoDB connection successful");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection successful");
});

const farmerRouter = require("./routes/farmer_routes.js");

app.use("/farmer", farmerRouter)

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});


//Pickup requests
const pickupRoutes = require('./routes/pickup_routes');


app.use('/api', pickupRoutes);