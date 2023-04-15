const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseSchema = new mongoose.Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    duration: Number,
    date: {
        type: Date,
    }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);