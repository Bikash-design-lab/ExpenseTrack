const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();

const ConnectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
    }
    catch (err) {
        console.log({ message: err.message });
        console.log("Failed to connect to DB");
    }
}

module.exports = { ConnectToDB };