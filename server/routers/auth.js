const passport = require('passport');

module.exports = app => {
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
};