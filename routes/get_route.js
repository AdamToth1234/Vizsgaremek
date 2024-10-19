const express = require("express")
const router = express.Router()


router.get("/", (req, res) => {
    res.render("index")
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login")
});

router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register")
})

router.get("/dashboard", checkAuthenticated, (req, res) => {
    res.send(`Welcome to your dashboard, ${req.user.email}<br><a href="/logout">Kijelentkezés</a>`);
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