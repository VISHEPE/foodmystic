const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/database'); // Your MySQL connection

// Function to create a new admin
async function createAdmin(email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashedPassword]);
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  }
}

// Function to create a new donor
async function createDonor(name, contact, email, image) {
  try {
    await db.query('INSERT INTO donors (name, contact, email, image) VALUES (?, ?, ?, ?)', [name, contact, email, image]);
    console.log('Donor created successfully');
  } catch (error) {
    console.error('Error creating donor:', error);
  }
}


// Route to show donor registration page
router.get('/registration', (req, res) => {
    res.render('registration'); 
  });

  // Route to display distribution centers 
  router.get('/adminManager/distroview', async (req, res) => {
    try {
        const [centers] = await db.query('SELECT * FROM distribution_centers'); 
        res.render('adminManager/distroview', { centers });
    } catch (error) {
        console.error('Error fetching centers:', error);
        res.status(500).send('Server error');
    }
});

// Route to display beneficiaries
router.get('bene', async (req, res) => {
    try {
        // Query to fetch all beneficiaries from the database
        const [beneficiaries] = await db.query('SELECT * FROM beneficiaries'); 
        
        // Pass the beneficiaries data to the 'bene.ejs' view
        res.render('/adminManager/bene', { beneficiaries });
    } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        res.status(500).send('Server error');
    }
});
// Route to display donors
router.get('/adminManager/donorsViews', async (req, res) => {
    try {
        const donors = await Donor.getAll(); // Ensure Donor.getAll() is working correctly
        res.render('adminManager/donors', { title: 'Donors', donors }); // Use correct path to 'donors.ejs'
    } catch (error) {
        console.error('Error fetching donors:', error); // Log errors for debugging
        res.status(500).send('Server error');
    }
});



// Admin login form
router.get('/login', (req, res) => {
  res.render('admin/login', { error: null });
});

// Handle admin and donor login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
   
    let [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);

    if (rows.length === 0) {
    
      [rows] = await db.query('SELECT * FROM donors WHERE contact = ?', [email]);
    }

    if (rows.length === 0) {
      return res.render('admin/login', { error: 'Invalid email or password' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password || user.contact);

    if (!match) {
      return res.render('admin/login', { error: 'Invalid email or password' });
    }

    // If login is successful, create a session
    req.session.userId = user.id;
    req.session.userType = rows[0].password ? 'admin' : 'donor'; 
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Admin dashboard
router.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/admin/login');
  }

  res.render('admin/dashboard');
});

// Admin logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
});


router.post('/add-admin', async (req, res) => {
  const { email, password } = req.body;
  try {
    await createAdmin(email, password);
    res.send('Admin user created successfully');
  } catch (error) {
    res.status(500).send('Error creating admin user');
  }
});

// Route to register a new donor
router.post('/add-donor', async (req, res) => {
  const { name, contact, email, image } = req.body;
  try {
    await createDonor(name, contact, email, image);
    res.send('Donor registered successfully');
  } catch (error) {
    res.status(500).send('Error registering donor');
  }
});

module.exports = router;
