const mongoose = require("mongoose");
require('dotenv').config();
const MONGODB_URI = "mongodb://127.0.0.1:27017/";
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI,{
            serverSelectionTimeoutMS: 5000,
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error: " , error);
        process.exit(1);
    }
};

module.exports = {
    connectDB 
}