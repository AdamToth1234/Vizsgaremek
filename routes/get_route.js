const express = require("express")
const router = express.Router()
const { connect, client } = require("../connect_db")


router.get("/", (req, res) => {
    res.render("index")
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login")
});

router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register")
})

router.get("/cart", checkNotAuthenticated, (req, res) => {
    res.render("cart")
})


router.post("/cart-get", async (req, res) => {
    const db = await connect()
    const col = db.collection("books")
    const idArray = req.body.content
    const documentArray = []
    if (idArray.length == 0) {
        return res.status(200).json("Üres a lista!")
    }

    for (const i of idArray) {
        const document = await col.findOne({ id: i})
        documentArray.push(document)
    }
    res.status(200).json(documentArray)

})

router.get("/konyvek", async (req, res) => {
    const db = await connect()
    const cols = await db.listCollections().toArray()

    let documentList = []

    for (const i of cols) {
        if (i.name != "users" && i.name != "books") {
            const col = db.collection(i.name)
            const document = await col.find().toArray()
            documentList.push(document)
        }
    }

    res.status(200).json(documentList)
})

router.get("/logout", checkAuthenticated, (req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(error)
        }
    })
    res.redirect("/login")
})


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/dashboard")
    }

    next()
}


module.exports = router