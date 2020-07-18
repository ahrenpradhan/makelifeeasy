const express = require("express");
const cors = require("cors");
const passport = require("passport");
// const FacebookStrategy = require("passport-facebook").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const keys = require('./config');
const chalk = require("chalk");
const mongoose = require('mongoose');

const strategyList = require('./provider/strategy');

let user = {};
for(let i = 0;i<strategyList.length;i++){
    passport.use(strategyList[i])
}

strategyList

// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.
passport.serializeUser((user1, cb) => {
    user = user1;
    cb(null, user1);
});
passport.deserializeUser((user1, cb) => {
    cb(null, user1);
});

require('dotenv').config();

// Create a new Express application.
var app = express();
const port = process.env.PORT || 5000;
// Use application-level middleware for common functionality
app.use(cors());
app.use(express.json());

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(' MongoDB database connection extablished successfully')
});

// oauth login
const appRouter = require('./provider/routes');
appRouter(passport, app)

app.get('/user',(req,res)=>{
    console.log("getting user data!");
    res.send(user);
})

app.get('/auth/logout', (req,res) => {
    console.log('logging out!');
    user = {};
    res.redirect("/");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
// api calls
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});