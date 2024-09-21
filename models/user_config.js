const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb+srv://vizsgaremek5:xUzMGihibSvk8GrM@cluster0.3p9yg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


connect.then(() => {
    console.log("Sikeres csatlakozás az adatbázishoz!");
})
.catch(() => {
    console.log("Nem található az adatbázis!")

})


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