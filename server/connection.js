const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://shahnwajalam10:GT4DIiwSFuH5dttS@cluster0.vbjhzk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const connectDb = async() => {
    const connection = mongoose.connect(MONGO_URI);
    if(connection){
        console.log("Database connected");
    }
    else{
        console.log("Database connection failed");
    }
};

module.exports = { connectDb };