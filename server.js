const express = require("express")
const path = require("path")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const session = require("express-session")
const passport = require("./passport-local")
const collectionUser = require("./models/user_config")
const mongoose = require("mongoose")


const connect = mongoose.connect("mongodb+srv://vizsgaremek5:xUzMGihibSvk8GrM@cluster0.3p9yg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

connect.then(() => {
    console.log("Sikeres csatlakozás az adatbázishoz!");
})
.catch(() => {
    console.log("Nem található az adatbázis!")

})

const app = express()

app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(express.json())
let initialPath = path.join(__dirname, "public")
app.use(express.static(initialPath));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: false
}))


app.get("/", (req, res) => {
    res.render("index")
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login")
});

app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register")
})

app.post("/register", async (req, res) => {
    const data = {
        vnev: req.body.vnev,
        knev: req.body.knev,
        email: req.body.email,
        password: req.body.password
    }

    const existingUser = await collectionUser.findOne({ email: data.email })

    if (existingUser) {
        res.render("register", { message: "Létezik ez az email cím! Használjon másikat!" })
    } else {
        const hashedPassword = await bcrypt.hash(data.password, 10)

        data.password = hashedPassword

        await collectionUser.insertMany(data)
        res.redirect("/login")
    }
})

app.get("/dashboard", checkAuthenticated, (req, res) => {
    res.send(`Welcome to your dashboard, ${req.user.email}<br><a href="/logout">Kijelentkezés</a>`);
})

app.get("/logout", checkAuthenticated, (req, res) => {
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



app.listen(3000)