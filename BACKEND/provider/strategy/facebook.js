const chalk = require("chalk");
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require('../../config');

const strategy = new FacebookStrategy({
    clientID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
    callbackURL: "/auth/facebook/callback"
},
(accessToken, refreshToken, profile, cb) => {
    console.log(chalk.blue(JSON.stringify(profile)))
    user = {
        ...profile
    };
    return cb(null, profile);
});

module.exports = strategy;