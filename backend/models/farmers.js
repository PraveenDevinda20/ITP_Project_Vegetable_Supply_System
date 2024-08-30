const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const farmerSchema = new Schema({

    firstName : {
        type : String,
        required:true
    },
    
    lastName : {
        type : String,
        required:true
    },

    DOB : {
        type : Date,
        required:true
    },

    age : {
        type : Number,
        required:true
    },
    gender : {
        type : String,
        required:true
    },

    NIC : {
        type:String,
        required:true,
        unique : true
    },

    address :{
        type : String,
        required:true
    },

    email :{
        type : String,
        required:true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address",
          ]
    },

    contact :{
        type:String,
        required:true
    },

    password : {
        type:String,
        required:true
    }

     


})



// Pre-save middleware to hash the password before saving
farmerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        return next(err);
    }
});

// Use environment variable for the JWT secret
const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';

// Method to generate a signed JWT token
farmerSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, jwtSecret, {
        expiresIn: '1h',
    });
};


// Method to compare entered password with the hashed password
farmerSchema.methods.matchPassword = async function (enteredPassword) {
    try {
      return await bcrypt.compare(enteredPassword, this.password);
    } catch (err) {
      throw new Error('Error comparing passwords');
    }
  };
  

const Farmer = mongoose.model("Farmer", farmerSchema);

module.exports = Farmer;
