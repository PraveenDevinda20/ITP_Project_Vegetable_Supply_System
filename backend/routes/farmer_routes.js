const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let Farmer = require("../models/farmers");

// Add a new farmer
router.route("/add").post(async (req, res) => {
  try {
    const { firstName, lastName, DOB, age, gender, NIC, address, email, contact, pwd: password } = req.body;

    // Input validation
    if (isNaN(age)) {
      return res.status(400).json({ error: "Invalid age value" });
    }

    if (isNaN(Date.parse(DOB))) {
      return res.status(400).json({ error: "Invalid date of birth" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newFarmer = new Farmer({
      firstName,
      lastName,
      DOB: new Date(DOB),
      age: Number(age),
      gender,
      NIC,
      address,
      email,
      contact,
      password: hashedPassword
    });

    await newFarmer.save();
    res.json("Farmer added");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add farmer", message: err.message });
  }
});

// Get all farmers
router.route("/").get((req, res) => {
  Farmer.find()
    .then((farmers) => {
      res.json(farmers);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch farmers", message: err.message });
    });
});

// Update a farmer by ID
router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { firstName, lastName, DOB, age, gender, NIC, address, email, contact, password } = req.body;

  try {
    // Input validation
    if (isNaN(age)) {
      return res.status(400).json({ error: "Invalid age value" });
    }

    if (isNaN(Date.parse(DOB))) {
      return res.status(400).json({ error: "Invalid date of birth" });
    }

    let updatedFields = { firstName, lastName, DOB, age, gender, NIC, address, email, contact };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedFields.password = hashedPassword;
    }

    const updatedFarmer = await Farmer.findByIdAndUpdate(userId, updatedFields, { new: true });

    if (!updatedFarmer) {
      return res.status(404).send({ status: "Farmer not found" });
    }

    res.status(200).send({ status: "Farmer updated", updatedFarmer });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
});

// Delete a farmer by ID
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  try {
    const deletedFarmer = await Farmer.findByIdAndDelete(userId);

    if (!deletedFarmer) {
      return res.status(404).send({ status: "Farmer not found" });
    }

    res.status(200).send({ status: "Farmer deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with deleting farmer", error: err.message });
  }
});

// Get a farmer by ID
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  try {
    const farmer = await Farmer.findById(userId);

    if (!farmer) {
      return res.status(404).send({ status: "Farmer not found" });
    }

    res.status(200).send({ status: "Farmer fetched", farmer });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with fetching farmer", error: err.message });
  }
});

// Farmer login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(400).json({ msg: 'Farmer not found' });
    }

    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      farmer: {
        id: farmer.id,
      },
    };

    jwt.sign(
      payload,
      'your_jwt_secret',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/debug/:id', async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) {
      return res.status(404).json({ msg: 'Farmer not found' });
    }
    res.json({ password: farmer.password });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
