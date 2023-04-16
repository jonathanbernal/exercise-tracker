const mongoose = require('mongoose');
const { Schema } = mongoose;

const LogSchema = new Schema({
    username: String,
    count: Number,
    log: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
}, {
    collection: 'logs',
    versionKey: false,
});

module.exports = mongoose.model('Log', LogSchema);