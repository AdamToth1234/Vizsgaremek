const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("./models/user_config")
const bcrypt = require("bcrypt")

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
    },
    async function(email, password, done) {
        
        const user = await User.findOne({ email: email})
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
    done(null, user._id)
})

passport.deserializeUser(async function(_id, done) {
    const user = await User.findOne({ _id: _id })
    done(null, user)
})

module.exports = passport