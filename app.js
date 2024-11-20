const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session'); // Import express-session
const flash = require('connect-flash'); // Import connect-flash


const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session middleware for flash messages
app.use(session({
  secret: 'your-secret-key', // replace with a secure secret
  resave: false,
  saveUninitialized: true
}));

// Flash middleware
app.use(flash());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Routes
const adminRoutes = require('./routes/adminRoutes');
const donorsRoutes = require('./routes/donors');
const beneficiariesRouter = require('./routes/beneficiaries');
const distributionCentersRouter = require('./routes/distributionCenters');
const foodTypesRouter = require('./routes/foodTypes');
const deliveryRecordsRouter = require('./routes/deliveryRecords');

app.use('/admin', adminRoutes);


app.use('/beneficiaries', beneficiariesRouter);
app.use('/distributionCenters', distributionCentersRouter);
app.use('/foodTypes', foodTypesRouter);
app.use('/deliveryRecords', deliveryRecordsRouter);
app.use('/donors', donorsRoutes);




// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'The Food Fairy' });
});

app.listen(port, () => {
  console.log(`The Food Fairy is spreading magic on port ${port}`);
});
