const chalk = require("chalk");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('../../config');

const strategy = new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, cb) => {
    console.log(chalk.blue(JSON.stringify(profile)))
    user = {
        ...profile
    };
    return cb(null, profile);
});

module.exports = strategy;