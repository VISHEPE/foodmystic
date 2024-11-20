const express = require('express');
const router = express.Router();
const multer = require('multer');
const DistributionCenter = require('../models/distributionCenter');
const Beneficiary = require('../models/beneficiary'); // Import the Beneficiary model
const path = require('path');  // Add this line




// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');  // Folder where you want to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Store with a unique name
  }
});

const upload = multer({ storage: storage });



// Create new distribution center (with image upload)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const image = req.file ? '/uploads/' + req.file.filename : null;  // Get image path
    const centerData = {
      name: req.body.name,
      address: req.body.address,
      capacity: req.body.capacity,
      image: image  // Store image path
    };

    await DistributionCenter.create(centerData);
    res.redirect('/distributionCenters');
  } catch (error) {
    res.status(500).send('Server error');
  }
});


// Get all distribution centers and beneficiaries
router.get('/', async (req, res) => {
  try {
    const centers = await DistributionCenter.getAll();
    const beneficiaries = await Beneficiary.getAll(); // Fetch all beneficiaries
    res.render('distributionCenters', { title: 'Distribution Centers', centers, beneficiaries });
  } catch (error) {
    res.status(500).send('Server error');
  }
});




// Create new distribution center
router.post('/', async (req, res) => {
  try {
    await DistributionCenter.create(req.body);
    res.redirect('/distribution-centers');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Add other CRUD routes (GET /:id, PUT /:id, DELETE /:id) if needed

module.exports = router;
