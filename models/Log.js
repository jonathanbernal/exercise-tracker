const mongoose = require('mongoose');
const { Schema } = mongoose;

const LogSchema = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    count: Number,
    _id: Schema.Types.ObjectId,
    log: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
});

module.exports = mongoose.Model('Log', LogSchema);