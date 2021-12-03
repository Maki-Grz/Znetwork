const mongoose = require("mongoose");

const configurationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    server: String,
    owner: String,
    salon: String,
    date: Date
})

module.exports = mongoose.model("configuration", configurationSchema);