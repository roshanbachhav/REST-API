const mongoose = require("mongoose");

const uri = "mongodb+srv://rv007:w5oFWbdS9ObJiz48@citycompass.wiibnzn.mongodb.net/CityCompass?retryWrites=true&w=majority&appName=CityCompass";

const dbConnect = () => {
    console.log("connected");
    return mongoose.connect(uri);
};

module.exports = dbConnect;