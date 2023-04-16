const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const { Schema } = mongoose;

const ExerciseSchema = new mongoose.Schema({
    username: String,
    description: String,
    duration: Number,
    date: {
        type: String,
    }
}, {
    collection: 'exercises',
    versionKey: false,
});

module.exports = mongoose.model('Exercise', ExerciseSchema);