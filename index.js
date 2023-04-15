const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Set up middleware
app.use(cors());
app.use(express.static('/public', dirname__ + '/public'));

// User-defined imports
const database = require('./bin/database.js');
const User = require('./models/User.js');
const Exercise = require('./models/Exercise.js');
const Log = require('./models/Log.js');

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', async (req, res) => {

});

app.post('/api/users/:_id/exercises', async (req, res) => {

});

// TODO: think about how to implement get route for
// GET /api/users/:_id/logs?[from][&to][&limit]





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
