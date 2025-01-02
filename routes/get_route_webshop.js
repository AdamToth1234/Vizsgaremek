const express = require("express")
const router = express.Router()
const { connect, client } = require("../connect_db")


router.get("/", (req, res) => {
    res.render("webshop")
})

router.get("/:url", async (req, res) => {
    const db = await connect()
    const col = db.collection("books")
    const document = await col.findOne({ url: req.params.url })
    await client.close()
    if (document == null) {
        return res.send("Rossz helyen jársz!")
    }

    res.render("book")
})

router.get("/lekeres/:url", checkHeader, async (req, res) => {
    let responses = []
    const db = await connect()
    const col = db.collection("books")
    const document = await col.findOne({ url: req.params.url })
    responses.push(document)

    const urlDocuments = await col.find({ id: { $regex: `${document.id.split("-")[0]}-` } }).toArray()
    responses.push(urlDocuments)
    await client.close()
    
    res.status(200).json(responses)
})



function checkHeader(req, res, next) {
    if (!req.headers["fetch-header"]) {
        return res.redirect("/webshop")
    }

    next()
}


module.exports = router