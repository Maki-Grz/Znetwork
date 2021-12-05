const mongoose = require("mongoose");

const configurationSchema = mongoose.Schema({
    canal: String,
    server: String,
    member: String,
    salon: String,
    date: Date
})

module.exports = mongoose.model("configuration", configurationSchema);