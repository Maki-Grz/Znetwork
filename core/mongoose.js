const mongoose = require('mongoose');
const config = require("../config/config.json");

module.exports = {
    init: () => {
        try {
            const mongOptions = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoIndex: true,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4
            }
    
            mongoose.connect(config.databaseConnection, mongOptions);
            mongoose.Promise = global.Promise;
            mongoose.connection.on("connected", () => { 
                console.log("Mongoose est connecté.");
                console.log("----------------------------");
            }
            );
        } catch (error) {
            console.log("Mongoose n'a pas réussi à se connecter.");
            console.log("----------------------------");
        }
    }
};