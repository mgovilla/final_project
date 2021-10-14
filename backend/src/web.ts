require('dotenv').config()
import { AnyError, MongoClient, ObjectId } from 'mongodb';
import path from 'path';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import { ObjectIdLike } from 'bson';
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

/* USING GITHUB STRATEGY */
passport.use(new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID_LOCAL,
        clientSecret: process.env.GITHUB_CLIENT_SECRET_LOCAL,
        callbackURL: process.env.CALLBACK_URL
    },

    function (_accessToken: string, _refreshToken: string, profile: { photos: any[]; id: any; displayName: any; }, cb: (arg0: AnyError, arg1: Express.User) => void) {
        let photo = profile.photos.length > 0 ? profile.photos[0].value : undefined;
        let user = { _id: profile.id, name: profile.displayName, photo }
        client.db("db").collection("users").updateOne({ _id: { $eq: profile.id } }, { $set: user }, { upsert: true }, (err) => {
            cb(err, user)
        })
    }
));

/* User Middleware */
passport.serializeUser(function (user: Express.User, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    client.db("db").collection("users").findOne({ _id: id }, (err, user) => {
        // assert the returned document is a user
        done(err, user as Express.User) 
    })
});

app.get('/logout', (req, res) => {
    req.user
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
        successRedirect: 'http://localhost:3000/home',
        failureRedirect: 'http://localhost:3000'
    })
);

// Get all resumes owned by the user
app.get('/resumes', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403)
        return
    }

    client.db('db')
        .collection('resumes')
        .find({ author_id: req.user._id })
        .toArray()
        .then((resumes) => {
            res.send(resumes)
        })
        .catch(err => {
            console.log(err); 
            res.sendStatus(500)
        })
})

// Get a single resume by ID
app.get('/resumes/:resumeID', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403)
        return
    }

    var id : ObjectId
    try {
        id = new ObjectId(req.params.resumeID)
    } catch(e) {
        res.sendStatus(400)
        return
    }

    client.db('db')
        .collection('resumes')
        .findOne({ _id: id,  author_id: req.user._id })
        .then((resume) => res.send(resume))
        .catch(err => {
            console.log(err); 
            res.sendStatus(500)
        })
})

// Create a new resume
app.post('/resumes', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403)
        return
    }

    let resume = {
        title: req.body.title,
        created_at: req.body.createdAt,
        author_id: req.user._id,
        content: req.body.content
    }

    try {
        client.db('db')
            .collection('resumes')
            .insertOne(resume)
            .then((resume) => res.send(resume))
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

// Update the contents in a resume
app.post('/resumes/:resumeID', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403)
        return
    }

    client.db('db')
        .collection('resumes')
        .updateOne({ _id: new ObjectId(req.params.resumeID) }, { $set: { content: req.body.content} })
        .then(() => res.sendStatus(200))
        .catch(err => { 
            console.log(err); 
            res.sendStatus(500) 
        })
})


// Delete a resume by its ID
app.delete('/resumes/:resumeID', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403)
        return
    }

    client.db('db')
        .collection('resumes')
        .findOneAndDelete({ _id: new ObjectId(req.params.resumeID), author_id: req.user._id })
        .then((resume) => res.send(resume))
        .catch(err => { 
            console.log(err); 
            res.sendStatus(500) 
        })
})

// Get all modules in a resume
app.get('/resumes/:resumeID/modules', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403)
        return
    }

    //First retrieve the resume
    client.db('db')
        .collection('resumes')
        .find({_id: new ObjectId(req.params.resumeID) })
        .toArray()
        .then((resume) => {
            //Get the list of module ids from the resume, use those values to return an array of the module objects
            let content = resume[0].content.map((id:string) => new ObjectId(id))

            client.db('db')
                .collection('modules')
                .find({_id: {$in: content}})
                .toArray()
                .then((moduleList) => res.send(moduleList))
        })
        .catch(err => {
            console.log(err); 
            res.sendStatus(500)
        })
})

// Create a new module
app.post('/modules', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403)
        return
    }

    let module = {
        type: req.body.type,
        title: req.body.title,
        content: req.body.content,
        in_use: req.body.in_use,
        author_id: req.user._id
    }

    try {
        client.db('db')
            .collection('modules')
            .insertOne(module)
            .then((module) => res.send(module))
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

// Get all modules owned by user
app.get('/modules', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403)
        return
    }

    client.db('db')
        .collection('modules')
        .find({ author_id: req.user._id })
        .toArray()
        .then((modules) => res.send(modules))
        .catch(err => {
            console.log(err); 
            res.sendStatus(500)
        })
})

// Get a single module by ID
app.get('/modules/:moduleID', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403)
        return
    }

    var id : ObjectId
    try {
        id = new ObjectId(req.params.moduleID)
    } catch(e) {
        res.sendStatus(400)
        return
    }

    client.db('db')
        .collection('modules')
        .findOne({ _id: id,  author_id: req.user._id })
        .then((modules) => res.send(modules))
        .catch(err => {
            console.log(err); 
            res.sendStatus(500)
        })
})

// Delete a single module
app.delete('/modules/:moduleID', (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(403)
        return
    }

    client.db('db')
        .collection('modules')
        .findOneAndDelete({ _id: new ObjectId(req.params.moduleID), author_id: req.user._id })
        .then((mod) => res.send(mod))
        .catch(err => { 
            console.log(err); 
            res.sendStatus(500) 
        })
})

// Connect to the client
client.connect(async err => {
    if (err) throw err

    app.listen(port)
});
