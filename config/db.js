const mongoose = require('mongoose');

const link_db = process.env.DB_URL;

const connectDb = () => {
    console.log('db connected');
    return mongoose.connect(link_db);
};

module.exports = connectDb;
