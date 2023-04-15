const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        lowercase: true,
        unique: true,
    },
    exercises: [{
            type: Schema.Types.ObjectId,
            ref: 'Exercise'
        }
    ]
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', UserSchema);