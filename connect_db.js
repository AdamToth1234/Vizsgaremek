const mongoose = require("mongoose")

const connect = mongoose.connect("mongodb+srv://vizsgaremek5:xUzMGihibSvk8GrM@cluster0.3p9yg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

connect.then(() => {
    console.log("Sikeres csatlakozás az adatbázishoz!");
})
.catch(() => {
    console.log("Nem található az adatbázis!")

})


module.exports = connect