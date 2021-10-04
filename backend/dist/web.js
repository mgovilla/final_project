"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongodb_1 = require("mongodb");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
var GitHubStrategy = require('passport-github').Strategy;
const app = (0, express_1.default)();
let port = parseInt(process.env.PORT);
if (port == null || isNaN(port)) {
    port = 5000;
}
const uri = process.env.MONGODB_URI;
const client = new mongodb_1.MongoClient(uri);
/* MIDDLEWARE SETUP */
app.use(express_1.default.static('public'));
app.use((0, express_session_1.default)({ secret: 'randomsecret', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 * 60 } }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express_1.default.json());
/* USING GITHUB STRATEGY */
passport_1.default.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID_LOCAL,
    clientSecret: process.env.GITHUB_CLIENT_SECRET_LOCAL,
    callbackURL: process.env.CALLBACK_URL
}, function (_accessToken, _refreshToken, profile, cb) {
    let photo = profile.photos.length > 0 ? profile.photos[0].value : undefined;
    let user = { _id: profile.id, name: profile.displayName, photo };
    client.db("db").collection("users").updateOne({ _id: { $eq: profile.id } }, { $set: user }, { upsert: true }, (err) => {
        cb(err, user);
    });
}));
/* User Middleware */
passport_1.default.serializeUser(function (user, done) {
    done(null, user._id);
});
passport_1.default.deserializeUser(function (id, done) {
    client.db("db").collection("users").findOne({ _id: id }, (err, user) => { done(err, user); });
});
app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(function () {
        console.log("destroying the session");
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});
// Callback URL from github
app.get('/auth', passport_1.default.authenticate('github', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000'
}));
// Connect to the client
client.connect((err) => __awaiter(void 0, void 0, void 0, function* () {
    if (err)
        throw err;
    app.listen(port);
}));
//# sourceMappingURL=web.js.map