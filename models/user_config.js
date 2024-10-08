const mongoose = require("mongoose")


const LoginSchema = new mongoose.Schema({
    vnev: {
        type: String,
        required: true
    },
    knev: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const collection = new mongoose.model("users", LoginSchema)

module.exports = collection