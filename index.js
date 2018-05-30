const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

require('dotenv').config();

const app = express();

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);
        done()
    })
);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8001;

app.get('/', (req, res, next) => {
    res.send({"hello": "World"});
    next();
});

app.get(
    "/auth/google",
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res, next) => {
        res.send('Welcome to Emailee');
        next();
    }
);

app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));