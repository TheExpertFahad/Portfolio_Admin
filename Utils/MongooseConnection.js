const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGODB_URL;
mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.log("disconnected to MongoDB", error)
    })

module.exports = mongoose.connection;

