const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseSchema = new mongoose.Schema({
    username: String,
    description: String,
    duration: Number,
    date: {
        type: Date,
    }
}, {
    collection: 'exercises',
    versionKey: false,
});

module.exports = mongoose.model('Exercise', ExerciseSchema);