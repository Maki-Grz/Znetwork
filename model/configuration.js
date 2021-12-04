const mongoose = require("mongoose");

const configurationSchema = mongoose.Schema({
    canal: String,
    server: Number,
    member: Number,
    salon: String,
    date: Date
})

module.exports = mongoose.model("configuration", configurationSchema);