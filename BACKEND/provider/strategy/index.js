const GoogleStrategy = require("./google");
const FacebookStrategy = require("./facebook");

const strategyList = [GoogleStrategy, FacebookStrategy];

module.exports = strategyList;