const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const { DateTime } = require('luxon');
require('dotenv').config();

// Set up middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use('*', (req, res, next) => {
  console.log(`${req.method} ${req.ip}`);
  next();
})

// User-defined imports
const database = require('./bin/Database.js');
const User = require('./models/User.js');
const Exercise = require('./models/Exercise.js');
const Log = require('./models/Log.js');

// This function returns a date in the format WKD Mon Day YYYY
// If the argument is empty, the current date is returned.

function sanitizeDate(date) {
  if (!date) {
    return DateTime.now().toFormat('EEE MMM dd yyyy')
  }
  return DateTime.fromISO(date).toFormat('EEE MMM dd yyyy')
}

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users', async (req, res) => {
  const allUserDocuments = await User.find();
  res.json(allUserDocuments);
});

app.post('/api/users', (req, res) => {
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username
  });

  newUser.save().then(savedUser => res.json(savedUser))
    .catch(err => {
      console.log('Error adding user. User already exists in DB');
      // We basically show the user the already created user for convenience
      // but we are not creating duplicates.
      User.findOne({username: req.body.username})
        .then( (existingUser) => res.json({error: `user with id ${existingUser.id} already exists`})) ;
    });
});

app.post('/api/users/:_id/exercises', async (req, res) => {
  // parse the id from the url parameters as some
  // POST payloads may not include the id.
  const requestedId = req.params['_id'];
  const bodyDate = req.body.date;

  try {
    const userExists = await User.findOne({ _id: requestedId });

    if (userExists) {
      const dateToInsert = sanitizeDate(bodyDate);

      const newExercise = new Exercise({
        username: userExists.username,
        description: req.body.description,
        duration: req.body.duration,
        date: dateToInsert,
      });

      await newExercise.save();
      userExists.exercises.push(newExercise);
      const updatedUser = await userExists.save();
      // return the exercise that was just created so the user knows
      // what was inserted into the target document.

      // This response does not represent the id with which each
      // exercise is stored. Each exercise needs its own id, or else
      // mongoDB will complain about creating duplicates.
      res.json({
        username: newExercise.username,
        description: newExercise.description,
        duration: newExercise.duration,
        date: newExercise.date,
        _id: updatedUser._id,
      });
    } else {
      res.json({ error: `user with id ${req.params[':_id']} does not exist in DB` });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/users/:_id/logs', async (req, res) => {
  const requestedId = req.params['_id'];
   
});
// TODO: think about how to implement get route for
// GET /api/users/:_id/logs?[from][&to][&limit]





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
