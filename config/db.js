const mongoose = require('mongoose');
const DB_URL =
    'mongodb+srv://solomonikandrey:123@cluster0.verutqr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDb = () => {
    console.log('db connected');
    return mongoose.connect(DB_URL);
};

module.exports = connectDb;
