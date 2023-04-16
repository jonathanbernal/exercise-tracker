const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const { Schema } = mongoose;

const ExerciseSchema = new mongoose.Schema({
    // username: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    username: String,
    description: String,
    duration: Number,
    date: {
        type: String,
    }
}, {
    collection: 'exercises'
});

module.exports = mongoose.model('Exercise', ExerciseSchema);