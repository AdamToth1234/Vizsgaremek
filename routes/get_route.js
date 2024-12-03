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

router.get("/webshop", (req, res) => {
    res.render("webshop")
})

router.get("/konyvek", async (req, res) => {
    const db = await connect()
    const col = db.collection("books")
    const documents = await col.find().toArray()

    res.status(200).json(documents)
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