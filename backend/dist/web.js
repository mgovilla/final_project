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
    client.db("db").collection("users").findOne({ _id: id }, (err, user) => {
        // assert the returned document is a user
        done(err, user);
    });
});
app.get('/logout', (req, res) => {
    req.user;
    req.logout();
    req.session.destroy(function () {
        console.log("destroying the session");
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});
// Callback URL from github
app.get('/auth', passport_1.default.authenticate('github', {
    successRedirect: 'http://localhost:3000/home',
    failureRedirect: 'http://localhost:3000'
}));
// Get all resumes owned by the user
app.get('/resumes', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403);
        return;
    }
    client.db('db')
        .collection('resumes')
        .find({ author_id: req.user._id })
        .toArray()
        .then((resumes) => {
        res.send(resumes);
    })
        .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});
// Get a single resume by ID
app.get('/resumes/:resumeID', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403);
        return;
    }
    var id;
    try {
        id = new mongodb_1.ObjectId(req.params.resumeID);
    }
    catch (e) {
        res.sendStatus(400);
        return;
    }
    client.db('db')
        .collection('resumes')
        .findOne({ _id: id, author_id: req.user._id })
        .then((resume) => res.send(resume))
        .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});
// Create a new resume
app.post('/resumes', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403);
        return;
    }
    let resume = {
        title: req.body.title,
        created_at: req.body.createdAt,
        author_id: req.user._id,
        content: req.body.content
    };
    try {
        client.db('db')
            .collection('resumes')
            .insertOne(resume)
            .then((resume) => res.send(resume));
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
// Update the contents in a resume
app.post('/resumes/:resumeID', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403);
        return;
    }
    client.db('db')
        .collection('resumes')
        .updateOne({ _id: new mongodb_1.ObjectId(req.params.resumeID) }, { $set: { content: req.body.content } })
        .then(() => res.sendStatus(200))
        .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});
// Delete a resume by its ID
app.delete('/resumes/:resumeID', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403);
        return;
    }
    client.db('db')
        .collection('resumes')
        .findOneAndDelete({ _id: new mongodb_1.ObjectId(req.params.resumeID), author_id: req.user._id })
        .then((resume) => res.send(resume))
        .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});
// Get all modules in a resume
app.get('/resumes/:resumeID/modules', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403);
        return;
    }
    //First retrieve the resume
    client.db('db')
        .collection('resumes')
        .find({ _id: new mongodb_1.ObjectId(req.params.resumeID) })
        .toArray()
        .then((resume) => {
        //Get the list of module ids from the resume, use those values to return an array of the module objects
        let content = resume[0].content.map((id) => new mongodb_1.ObjectId(id));
        client.db('db')
            .collection('modules')
            .find({ _id: { $in: content } })
            .toArray()
            .then((moduleList) => res.send(moduleList));
    })
        .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});
// Create a new module
app.post('/modules', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403);
        return;
    }
    let module = {
        type: req.body.type,
        title: req.body.title,
        content: req.body.content,
        in_use: req.body.in_use,
        author_id: req.user._id
    };
    try {
        client.db('db')
            .collection('modules')
            .insertOne(module)
            .then((module) => res.send(module));
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
// Get all modules owned by user
app.get('/modules', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403);
        return;
    }
    client.db('db')
        .collection('modules')
        .find({ author_id: req.user._id })
        .toArray()
        .then((modules) => res.send(modules))
        .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});
// Get a single module by ID
app.get('/modules/:moduleID', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403);
        return;
    }
    var id;
    try {
        id = new mongodb_1.ObjectId(req.params.moduleID);
    }
    catch (e) {
        res.sendStatus(400);
        return;
    }
    client.db('db')
        .collection('modules')
        .findOne({ _id: id, author_id: req.user._id })
        .then((modules) => res.send(modules))
        .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});
// Delete a single module
app.delete('/modules/:moduleID', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403);
        return;
    }
    client.db('db')
        .collection('modules')
        .findOneAndDelete({ _id: new mongodb_1.ObjectId(req.params.moduleID), author_id: req.user._id })
        .then((mod) => res.send(mod))
        .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});
// Connect to the client
client.connect((err) => __awaiter(void 0, void 0, void 0, function* () {
    if (err)
        throw err;
    app.listen(port);
}));
//# sourceMappingURL=web.js.map