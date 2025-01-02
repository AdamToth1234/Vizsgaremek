const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { connect, client } = require("./connect_db")
const bcrypt = require("bcrypt")

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
    },
    async function(email, password, done) {
        const db = await connect()
        const col = db.collection("users")

        const user = await col.findOne({ email: email})
        await client.close()
        
        if (!user) {
            return done(null, false, { message: "Nincs ilyen felhasználó ezzel az email címmel!" })
        }
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user)
        } else {
            return done(null, false, { message: "Helytelen jelszó!" })
        }
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.email)
})

passport.deserializeUser(async function(email, done) {
    const db = await connect()
    const col = db.collection("users")
    const user = await col.findOne({ email: email})

    await client.close()

    done(null, user)
})

module.exports = passport