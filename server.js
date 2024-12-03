const express = require("express")
const path = require("path")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const session = require("express-session")
const passport = require("./passport-local")
const { connect, client } = require("./connect_db")
const get_routes = require("./routes/get_route")
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
app.use("/", get_routes)


app.post("/login", passport.authenticate("local", {
    successRedirect: "/webshop",
    failureRedirect: "/login",
    failureFlash: false
}))

app.post("/register", async (req, res) => {
    const result = []
    const data = {
        vnev: req.body.vnev,
        knev: req.body.knev,
        email: req.body.email,
        password: req.body.password
    }

    result.push(data)

    // const existingUser = await collectionUser.findOne({ email: data.email })
    const db = await connect()
    const col = db.collection("users")

    const existingUser = await col.findOne({ email: data.email })
    

    if (existingUser) {
        res.render("register", { message: "Létezik ez az email cím! Használjon másikat!" })
        await client.close();
    } else {
        const hashedPassword = await bcrypt.hash(data.password, 10)

        data.password = hashedPassword

        await col.insertMany(result)
        await client.close();
        res.redirect("/login")
    }
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