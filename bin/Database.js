const mongoose = require('mongoose');

const Database = async () => {
    const connection = mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    return connection;
}

module.exports = Database().then(result => console.log(result))
    .catch(err => console.log(err));