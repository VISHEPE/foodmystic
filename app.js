const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

//Routes
const donorsRouter = require('./routes/donors');
const beneficiariesRouter = require('./routes/beneficiaries');
const distributionCentersRouter = require('./routes/distributionCenters');
const foodTypesRouter = require('./routes/foodTypes');
const deliveryRecordsRouter = require('./routes/deliveryRecords');

app.use('/donors', donorsRouter);
app.use('/beneficiaries', beneficiariesRouter);
app.use('/distribution-centers', distributionCentersRouter);
app.use('/food-types', foodTypesRouter);
app.use('/delivery-records', deliveryRecordsRouter);

// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'The Food Fairy' });
});

app.listen(port, () => {
  console.log(`The Food Fairy is spreading magic on port ${port}`);
});