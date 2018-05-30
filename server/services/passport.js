const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user.id)
        })
});

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id})
            .then(existUser => {
                if (existUser) {
                    console.log('Your data currently in database');
                    done(null, existUser)
                } else {
                    new User({googleId: profile.id})
                        .save()
                        .then(user => {
                            done(null, user)
                        });
                    console.log('Your data now in database');
                }
            });
    })
);