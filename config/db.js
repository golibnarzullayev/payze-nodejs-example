const mongoose = require('mongoose');

const environments = require('./environments');

exports.connectDB = async () => {
    try {
        const connect = await mongoose.connect(environments.MONGO_URI);

        console.log(`Connected DB to ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}