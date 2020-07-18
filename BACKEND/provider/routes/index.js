const facebookRouter = require("./facebook");
const googleRouter = require('./google');

const router = (passport, app)=>{
    facebookRouter(passport, app);
    googleRouter(passport, app);
}

module.exports = router;