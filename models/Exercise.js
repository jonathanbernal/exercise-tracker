const mongoose = require('mongoose');
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
        type: Date,
    }
}, {
    collection: 'exercises'
});

module.exports = mongoose.model('Exercise', ExerciseSchema);