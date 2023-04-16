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
}, {
    collection: 'logs',
});

module.exports = mongoose.model('Log', LogSchema);