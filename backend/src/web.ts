require('dotenv').config()
import { AnyError, MongoClient, ObjectId } from 'mongodb';
import path from 'path';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
var GitHubStrategy = require('passport-github').Strategy;

const app = express()
let port = parseInt(process.env.PORT);
if (port == null || isNaN(port)) {
    port = 5000;
}

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

/* MIDDLEWARE SETUP */
app.use(express.static('public'))
app.use(session({ secret: 'randomsecret', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 * 60 } }));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json())

declare type user = {
    _id: string,
    name: string,
    photo: string
}

/* USING GITHUB STRATEGY */
passport.use(new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID_LOCAL,
        clientSecret: process.env.GITHUB_CLIENT_SECRET_LOCAL,
        callbackURL: process.env.CALLBACK_URL
    },

    function (_accessToken: string, _refreshToken: string, profile: { photos: any[]; id: any; displayName: any; }, cb: (arg0: AnyError, arg1: user) => void) {
        let photo = profile.photos.length > 0 ? profile.photos[0].value : undefined;
        let user = { _id: profile.id, name: profile.displayName, photo }
        client.db("db").collection("users").updateOne({ _id: { $eq: profile.id } }, { $set: user }, { upsert: true }, (err) => {
            cb(err, user)
        })
    }
));

/* User Middleware */
passport.serializeUser(function (user: user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    client.db("db").collection("users").findOne({ _id: id }, (err, user) => { done(err, user) })
});

app.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy(function () {
        console.log("destroying the session")
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
})

// Callback URL from github
app.get('/auth',
    passport.authenticate('github', {
        successRedirect: 'http://localhost:3000',
        failureRedirect: 'http://localhost:3000'
    })
);

// Connect to the client
client.connect(async err => {
    if (err) throw err

    app.listen(port)
});
