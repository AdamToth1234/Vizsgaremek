const { MongoClient }  = require("mongodb")

const uri = "mongodb+srv://vizsgaremek5:xUzMGihibSvk8GrM@cluster0.3p9yg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri);
                      
async function connect() {
    try {
        await client.connect();
        var db = client.db("library");
    }

    catch {
        console.log("Nem sikerült az adatbázis elérése");
    }

    return db
}


module.exports = { connect, client }